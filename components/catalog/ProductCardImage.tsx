'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ProductCardImageProps {
  images: string[];
  name: string;
  sizes: string;
  priority?: boolean;
  /** Extra classes for the frame (aspect ratio is set here to avoid layout shift). */
  className?: string;
}

const FALLBACK = '/placeholder/product-1.svg';
const SWIPE_THRESHOLD = 30;

/**
 * Product card picture. On hover/keyboard focus it cross-fades to the product's
 * second real photo. The second photo is only requested the first time the user
 * shows intent (hover, focus or touch), and any failure keeps the main photo.
 * On touch screens a horizontal swipe toggles photos and two dots show it.
 * Must be rendered inside an element with the `group` class.
 */
export default function ProductCardImage({
  images,
  name,
  sizes,
  priority = false,
  className = '',
}: ProductCardImageProps) {
  const first = images[0] || FALLBACK;
  const second = images.length > 1 && images[1] !== images[0] ? images[1] : null;

  const frameRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const swiped = useRef(false);
  const [armed, setArmed] = useState(false);
  const [secondReady, setSecondReady] = useState(false);
  const [secondFailed, setSecondFailed] = useState(false);
  const [touchSecond, setTouchSecond] = useState(false);

  // Keyboard users: arm the preload when the surrounding link receives focus.
  useEffect(() => {
    if (!second) return;
    const link = frameRef.current?.closest('a');
    if (!link) return;
    const arm = () => setArmed(true);
    // focusin bubbles (unlike focus), so it fires whether the link itself or a
    // child receives focus.
    link.addEventListener('focusin', arm);
    return () => link.removeEventListener('focusin', arm);
  }, [second]);

  const canShowSecond = Boolean(second) && !secondFailed;

  const handlePointerEnter = (event: React.PointerEvent) => {
    if (event.pointerType === 'mouse') setArmed(true);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    swiped.current = false;
    if (second) setArmed(true);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null || !canShowSecond) return;
    const dx = event.changedTouches[0].clientX - start;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      swiped.current = true;
      setTouchSecond(dx < 0);
    }
  };

  // A swipe must not also count as a tap on the surrounding link.
  const handleClickCapture = (event: React.MouseEvent) => {
    if (swiped.current) {
      event.preventDefault();
      event.stopPropagation();
      swiped.current = false;
    }
  };

  const secondVisibility = touchSecond
    ? 'opacity-100'
    : 'opacity-0 [@media(hover:hover)]:group-hover:opacity-100 group-focus-within:opacity-100';

  return (
    <div
      ref={frameRef}
      className={`relative aspect-[4/3] overflow-hidden bg-bg-subtle ${className}`}
      onPointerEnter={handlePointerEnter}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClickCapture={handleClickCapture}
      style={{ touchAction: 'pan-y' }}
    >
      <Image
        src={first}
        alt={name}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        className="object-cover object-center"
      />

      {second && armed && !secondFailed && (
        <Image
          src={second}
          alt=""
          aria-hidden="true"
          fill
          sizes={sizes}
          loading="eager"
          onLoad={() => setSecondReady(true)}
          onError={() => setSecondFailed(true)}
          className={`object-cover object-center transition-opacity duration-500 ease-out motion-reduce:transition-none ${
            secondReady ? secondVisibility : 'opacity-0'
          }`}
        />
      )}

      {canShowSecond && (
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-1.5 [@media(hover:none)]:flex"
        >
          <span
            className={`h-1.5 rounded-full bg-white shadow transition-all duration-300 motion-reduce:transition-none ${
              touchSecond ? 'w-1.5 opacity-60' : 'w-4'
            }`}
          />
          <span
            className={`h-1.5 rounded-full bg-white shadow transition-all duration-300 motion-reduce:transition-none ${
              touchSecond ? 'w-4' : 'w-1.5 opacity-60'
            }`}
          />
        </span>
      )}
    </div>
  );
}
