'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, Play } from 'lucide-react';
import ProductLightbox from './ProductLightbox';

interface ProductGalleryProps {
  images: string[];
  videos?: string[];
  productName: string;
}

type MediaItem =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string };

const SWIPE_THRESHOLD = 50;

export default function ProductGallery({
  images,
  videos = [],
  productName,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const photos = images.length > 0 ? images : ['/placeholder/product-1.svg'];
  const media: MediaItem[] = [
    ...photos.map((src) => ({ type: 'image' as const, src })),
    ...videos.map((src) => ({ type: 'video' as const, src })),
  ];
  const total = media.length;
  const hasMany = total > 1;
  const active = media[selectedIndex] ?? media[0];

  const goTo = (next: number) => setSelectedIndex(((next % total) + total) % total);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!hasMany || (event.target as HTMLElement).tagName === 'VIDEO') return;
    if (event.key === 'ArrowLeft') goTo(selectedIndex - 1);
    else if (event.key === 'ArrowRight') goTo(selectedIndex + 1);
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    touchStart.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || active.type !== 'image') return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    if (hasMany && Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      goTo(selectedIndex + (dx < 0 ? 1 : -1));
    } else if (Math.hypot(dx, dy) < 8) {
      setLightboxOpen(true);
    }
  };

  const arrowClass =
    'absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-primary shadow-soft transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent';

  return (
    <div
      className="flex min-w-0 flex-col-reverse gap-3 self-start md:flex-row md:items-start"
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="carrusel"
      aria-label={`Galería de ${productName}`}
    >
      {hasMany && (
        <div className="flex gap-2 overflow-x-auto pb-1 md:max-h-[520px] md:flex-col md:overflow-y-auto md:overflow-x-hidden md:pb-0">
          {media.map((item, index) => (
            <button
              type="button"
              key={`${item.src}-${index}`}
              onClick={() => setSelectedIndex(index)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:h-20 md:w-20 ${
                index === selectedIndex
                  ? 'border-accent-deep'
                  : 'border-transparent opacity-80 hover:border-border hover:opacity-100'
              }`}
              aria-label={
                item.type === 'video'
                  ? `Ver video ${index - photos.length + 1} de ${productName}`
                  : `Ver imagen ${index + 1} de ${productName}`
              }
              aria-current={index === selectedIndex}
            >
              <Image
                src={item.type === 'video' ? photos[0] : item.src}
                alt=""
                fill
                className={`object-cover ${item.type === 'video' ? 'opacity-70' : ''}`}
                sizes="80px"
                loading="lazy"
              />
              {item.type === 'video' && (
                <span className="absolute inset-0 grid place-items-center bg-primary/40 text-white">
                  <Play size={18} />
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      <div className="relative aspect-[4/3] w-full min-w-0 flex-1 overflow-hidden rounded-[1.75rem] bg-bg-subtle shadow-soft">
        <div
          className={`flex h-full w-full ease-[cubic-bezier(.22,1,.36,1)] transition-transform duration-500 motion-reduce:transition-none ${
            active.type === 'image' ? 'cursor-zoom-in' : ''
          }`}
          style={{
            transform: `translate3d(-${selectedIndex * 100}%, 0, 0)`,
            touchAction: 'pan-y',
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => (touchStart.current = null)}
        >
          {media.map((item, index) => {
            // Only mount the current slide and its neighbours so the whole
            // gallery is never downloaded up front.
            const near = Math.abs(index - selectedIndex) <= 1 ||
              (total > 2 && Math.abs(index - selectedIndex) === total - 1);
            return (
              <div key={`${item.src}-${index}`} className="relative h-full w-full flex-shrink-0">
                {!near ? null : item.type === 'video' ? (
                  <video
                    src={item.src}
                    poster={photos[0]}
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-contain"
                    aria-label={`Video de ${productName}`}
                    onPointerDown={(e) => e.stopPropagation()}
                    onPointerUp={(e) => e.stopPropagation()}
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={`${productName} - imagen ${index + 1} de ${photos.length}`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="select-none object-contain"
                    draggable={false}
                  />
                )}
              </div>
            );
          })}
        </div>

        {hasMany && (
          <>
            <button
              type="button"
              onClick={() => goTo(selectedIndex - 1)}
              className={`${arrowClass} left-3`}
              aria-label="Anterior"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => goTo(selectedIndex + 1)}
              className={`${arrowClass} right-3`}
              aria-label="Siguiente"
            >
              <ChevronRight size={22} />
            </button>
            <span
              className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-primary/75 px-3 py-1.5 text-xs font-medium text-white"
              aria-live="polite"
            >
              {selectedIndex + 1} / {total}
            </span>
          </>
        )}

        {active.type === 'image' && (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-4 right-4 z-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-white/90 px-4 text-xs font-semibold text-primary shadow-soft transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Ampliar imagen para ver detalles"
          >
            <Maximize2 size={16} /> Ampliar
          </button>
        )}
      </div>

      {lightboxOpen && (
        <ProductLightbox
          images={photos}
          startIndex={Math.min(selectedIndex, photos.length - 1)}
          productName={productName}
          onClose={(last) => {
            setLightboxOpen(false);
            setSelectedIndex(last);
          }}
        />
      )}
    </div>
  );
}
