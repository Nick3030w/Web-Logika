'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Minus, Plus, RotateCcw, X } from 'lucide-react';

interface ProductLightboxProps {
  images: string[];
  startIndex: number;
  productName: string;
  onClose: (lastIndex: number) => void;
}

interface View {
  scale: number;
  x: number;
  y: number;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;
const SWIPE_THRESHOLD = 60;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * Full-screen viewer for product photos. Supports wheel / button / pinch /
 * double-tap zoom, drag-to-pan while zoomed, swipe and arrow keys to change
 * photo, and Escape to close. Focus is trapped and restored on close.
 */
export default function ProductLightbox({
  images,
  startIndex,
  productName,
  onClose,
}: ProductLightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const [view, setView] = useState<View>({ scale: 1, x: 0, y: 0 });
  const [interacting, setInteracting] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef(view);
  viewRef.current = view;
  const indexRef = useRef(index);
  indexRef.current = index;

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    startDist: 0,
    startScale: 1,
    lastTap: 0,
  });

  const total = images.length;

  const constrain = useCallback((next: View): View => {
    const stage = stageRef.current;
    const scale = clamp(next.scale, MIN_SCALE, MAX_SCALE);
    if (!stage || scale === 1) return { scale, x: 0, y: 0 };
    const limitX = (stage.clientWidth * (scale - 1)) / 2;
    const limitY = (stage.clientHeight * (scale - 1)) / 2;
    return {
      scale,
      x: clamp(next.x, -limitX, limitX),
      y: clamp(next.y, -limitY, limitY),
    };
  }, []);

  const zoomBy = useCallback(
    (delta: number) => {
      setView((current) => constrain({ ...current, scale: current.scale + delta }));
    },
    [constrain]
  );

  const resetView = useCallback(() => setView({ scale: 1, x: 0, y: 0 }), []);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
      setView({ scale: 1, x: 0, y: 0 });
    },
    [total]
  );

  const close = useCallback(() => onClose(indexRef.current), [onClose]);

  // Scroll lock, focus management, keyboard.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>('[data-autofocus]')?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'ArrowLeft') {
        goTo(indexRef.current - 1);
      } else if (event.key === 'ArrowRight') {
        goTo(indexRef.current + 1);
      } else if (event.key === '+' || event.key === '=') {
        zoomBy(0.5);
      } else if (event.key === '-') {
        zoomBy(-0.5);
      } else if (event.key === 'Tab' && dialog) {
        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>('button:not([disabled])')
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus?.();
    };
  }, [close, goTo, zoomBy]);

  // Wheel zoom needs a non-passive listener to prevent page scroll.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      zoomBy(event.deltaY < 0 ? 0.4 : -0.4);
    };
    stage.addEventListener('wheel', handleWheel, { passive: false });
    return () => stage.removeEventListener('wheel', handleWheel);
  }, [zoomBy]);

  const distance = () => {
    const [a, b] = Array.from(pointers.current.values());
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    setInteracting(true);

    const g = gesture.current;
    g.startX = event.clientX;
    g.startY = event.clientY;
    g.originX = viewRef.current.x;
    g.originY = viewRef.current.y;
    if (pointers.current.size === 2) {
      g.startDist = distance();
      g.startScale = viewRef.current.scale;
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const g = gesture.current;

    if (pointers.current.size === 2 && g.startDist > 0) {
      const scale = g.startScale * (distance() / g.startDist);
      setView((current) => constrain({ ...current, scale }));
      return;
    }

    if (pointers.current.size === 1 && viewRef.current.scale > 1) {
      setView((current) =>
        constrain({
          scale: current.scale,
          x: g.originX + (event.clientX - g.startX),
          y: g.originY + (event.clientY - g.startY),
        })
      );
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    const wasSingle = pointers.current.size === 1;
    pointers.current.delete(event.pointerId);
    if (pointers.current.size === 0) setInteracting(false);
    if (!wasSingle) return;

    const g = gesture.current;
    const dx = event.clientX - g.startX;
    const dy = event.clientY - g.startY;
    const moved = Math.hypot(dx, dy);

    if (viewRef.current.scale === 1 && Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      goTo(indexRef.current + (dx < 0 ? 1 : -1));
      return;
    }

    if (moved < 10) {
      const now = Date.now();
      if (now - g.lastTap < 300) {
        setView(
          viewRef.current.scale > 1
            ? { scale: 1, x: 0, y: 0 }
            : constrain({ scale: DOUBLE_TAP_SCALE, x: 0, y: 0 })
        );
        g.lastTap = 0;
      } else {
        g.lastTap = now;
      }
    }
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size === 0) setInteracting(false);
  };

  const controlClass =
    'grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-40';

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Vista ampliada de ${productName}`}
      className="fixed inset-0 z-[60] flex flex-col bg-[#101112]/95"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-white sm:px-6">
        <p className="text-sm text-white/80" aria-live="polite">
          {index + 1} / {total}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => zoomBy(-0.5)}
            disabled={view.scale <= MIN_SCALE}
            className={controlClass}
            aria-label="Alejar"
          >
            <Minus size={18} />
          </button>
          <button
            type="button"
            onClick={() => zoomBy(0.5)}
            disabled={view.scale >= MAX_SCALE}
            className={controlClass}
            aria-label="Acercar"
          >
            <Plus size={18} />
          </button>
          <button
            type="button"
            onClick={resetView}
            disabled={view.scale === 1}
            className={controlClass}
            aria-label="Restablecer zoom"
          >
            <RotateCcw size={18} />
          </button>
          <button
            type="button"
            onClick={close}
            data-autofocus
            className={controlClass}
            aria-label="Cerrar vista ampliada"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          className={`absolute inset-0 overflow-hidden ${
            view.scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
          }`}
          style={{ touchAction: 'none' }}
        >
          <div
            className={`absolute inset-0 will-change-transform ${
              interacting ? '' : 'transition-transform duration-200 ease-out motion-reduce:transition-none'
            }`}
            style={{
              transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
            }}
          >
            <Image
              key={images[index]}
              src={images[index]}
              alt={`${productName} - foto ${index + 1} de ${total}`}
              fill
              quality={90}
              sizes="(min-width: 1024px) 2000px, 100vw"
              priority
              draggable={false}
              className="select-none object-contain"
            />
          </div>
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className={`${controlClass} absolute left-3 top-1/2 -translate-y-1/2 sm:left-6`}
              aria-label="Foto anterior"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className={`${controlClass} absolute right-3 top-1/2 -translate-y-1/2 sm:right-6`}
              aria-label="Foto siguiente"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      <p className="px-4 py-3 text-center text-xs text-white/60">
        Pellizca, usa la rueda o doble toque para acercar. Arrastra para mover.
      </p>
    </div>
  );
}
