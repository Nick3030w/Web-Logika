'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  videos?: string[];
  productName: string;
}

type MediaItem =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string };

export default function ProductGallery({
  images,
  videos = [],
  productName,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const photos = images.length > 0 ? images : ['/placeholder/product-1.svg'];
  const media: MediaItem[] = [
    ...photos.map((src) => ({ type: 'image' as const, src })),
    ...videos.map((src) => ({ type: 'video' as const, src })),
  ];

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      setSelectedIndex((current) => (current > 0 ? current - 1 : media.length - 1));
    } else if (event.key === 'ArrowRight') {
      setSelectedIndex((current) => (current < media.length - 1 ? current + 1 : 0));
    }
  };

  const active = media[selectedIndex] ?? media[0];

  const mainMedia =
    active.type === 'video' ? (
      <video
        key={active.src}
        src={active.src}
        poster={photos[0]}
        controls
        playsInline
        preload="metadata"
        className="h-full w-full animate-fade-in object-cover"
        aria-label={`Video de ${productName}`}
      />
    ) : (
      <Image
        key={active.src}
        src={active.src}
        alt={`${productName} - imagen principal`}
        fill
        className="animate-fade-in object-cover"
        sizes="(max-width: 1024px) 100vw, 60vw"
        priority
      />
    );

  if (media.length === 1) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-bg-subtle shadow-soft">
        {mainMedia}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col-reverse gap-3 md:flex-row"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`Galería de ${productName}`}
    >
      <div className="flex gap-2 overflow-x-auto md:max-h-[520px] md:flex-col md:overflow-y-auto">
        {media.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            onClick={() => setSelectedIndex(index)}
            className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent md:h-20 md:w-20 ${
              index === selectedIndex ? 'border-accent-deep' : 'border-transparent hover:border-border'
            }`}
            aria-label={
              item.type === 'video'
                ? `Ver video ${index + 1} de ${productName}`
                : `Ver imagen ${index + 1} de ${productName}`
            }
            aria-pressed={index === selectedIndex}
          >
            {item.type === 'video' ? (
              <>
                <Image
                  src={photos[0]}
                  alt=""
                  fill
                  className="object-cover opacity-70"
                  sizes="80px"
                  loading="lazy"
                />
                <span className="absolute inset-0 grid place-items-center bg-primary/40 text-white">
                  <Play size={18} />
                </span>
              </>
            ) : (
              <Image
                src={item.src}
                alt={`${productName} - vista ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
                loading="lazy"
              />
            )}
          </button>
        ))}
      </div>

      <div className="relative aspect-[4/3] flex-1 overflow-hidden rounded-[1.75rem] bg-bg-subtle shadow-soft">
        {mainMedia}
        <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-primary/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
          {selectedIndex + 1} / {media.length}
        </span>
      </div>
    </div>
  );
}
