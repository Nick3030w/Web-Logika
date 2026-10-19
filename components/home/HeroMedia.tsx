'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface HeroMediaProps {
  videoSrc: string;
  posterSrc: string;
}

/**
 * Hero background media. Shows the poster image first, then plays a muted,
 * looping video on top once it can play. The video never autoplays with sound.
 * When the user prefers reduced motion, the video is not loaded at all and the
 * poster image stays as a still background.
 */
export default function HeroMedia({ videoSrc, posterSrc }: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduceMotion(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      {/* Poster: always rendered so there is no empty frame while the video loads. */}
      <Image
        src={posterSrc}
        alt="Sala contemporánea con mobiliario fabricado por Logika Decoración"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 55vw"
        className={`object-cover transition-opacity duration-700 ${
          showVideo ? 'opacity-0' : 'animate-slow-zoom opacity-100'
        }`}
      />

      {!reduceMotion && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setShowVideo(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            showVideo ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </>
  );
}
