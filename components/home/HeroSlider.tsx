'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  href: string;
}

const SLIDES: Slide[] = [
  {
    image: '/placeholder/hero-1.svg',
    title: 'Muebles a tu medida',
    subtitle: 'Diseñamos y fabricamos el mueble perfecto para tu espacio',
    href: '/catalogo',
  },
  {
    image: '/placeholder/hero-2.svg',
    title: 'Calidad artesanal',
    subtitle: 'Materiales premium y acabados de alta calidad en cada pieza',
    href: '/nosotros',
  },
  {
    image: '/placeholder/hero-3.svg',
    title: 'Tu hogar, tu estilo',
    subtitle: 'Sofás, camas, comedores y más para transformar tus espacios',
    href: '/catalogo',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev < SLIDES.length - 1 ? prev + 1 : 0));
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : SLIDES.length - 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <div
      className="relative w-full h-[70vh] sm:h-[80vh] lg:h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Slider principal"
    >
      {/* Slides */}
      {SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          aria-hidden={idx !== current}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority={idx === 0}
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="text-white/90 text-lg sm:text-xl max-w-xl mb-6 drop-shadow">
              {slide.subtitle}
            </p>
            <Link
              href={slide.href}
              className="bg-accent hover:bg-accent/90 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              Explorar
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Slide siguiente"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === current ? 'bg-accent' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Ir a slide ${idx + 1}`}
            aria-current={idx === current ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
}
