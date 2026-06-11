'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    } else if (e.key === 'ArrowRight') {
      setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }
  };

  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/3] bg-bg-subtle rounded-lg overflow-hidden">
        <Image
          src="/placeholder/product-1.svg"
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="relative aspect-[4/3] bg-bg-subtle rounded-lg overflow-hidden">
        <Image
          src={images[0]}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col-reverse md:flex-row gap-3"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`Galería de imágenes de ${productName}`}
    >
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[400px]">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
              idx === selectedIndex ? 'border-accent' : 'border-transparent hover:border-gray-300'
            }`}
            aria-label={`Ver imagen ${idx + 1} de ${productName}`}
            aria-pressed={idx === selectedIndex}
          >
            <Image
              src={img}
              alt={`${productName} - imagen ${idx + 1}`}
              fill
              className="object-cover"
              sizes="80px"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 aspect-[4/3] bg-bg-subtle rounded-lg overflow-hidden">
        <Image
          src={images[selectedIndex]}
          alt={`${productName} - imagen principal`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
      </div>
    </div>
  );
}
