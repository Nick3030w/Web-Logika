'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/constants/categories';
import { CategorySlug } from '@/types/product';

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('categoria') as CategorySlug | null;
  const activeChipRef = useRef<HTMLButtonElement>(null);

  const handleFilter = (slug: CategorySlug | null) => {
    router.push(slug ? `/catalogo?categoria=${slug}` : '/catalogo');
  };

  // On mobile the chips scroll horizontally; keep the active one in view so it
  // never stays hidden off-screen after selecting or loading the page.
  useEffect(() => {
    activeChipRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeCategory]);

  const chipClass = (isActive: boolean) =>
    `min-h-11 flex-shrink-0 rounded-full px-4 py-2 text-left text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-accent ${
      isActive
        ? 'bg-primary text-white'
        : 'bg-white text-text-muted hover:bg-bg-subtle hover:text-primary'
    }`;

  return (
    <nav aria-label="Filtrar por categoría">
      <p className="mb-4 hidden text-sm font-semibold text-text-muted md:block">
        Categorías
      </p>
      {/* Fade on the right edge hints there are more chips to scroll (mobile only). */}
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            ref={!activeCategory ? activeChipRef : undefined}
            onClick={() => handleFilter(null)}
            className={chipClass(!activeCategory)}
            aria-pressed={!activeCategory}
          >
            Todos
          </button>
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.slug;
            return (
              <button
                key={category.slug}
                ref={isActive ? activeChipRef : undefined}
                onClick={() => handleFilter(category.slug)}
                className={chipClass(isActive)}
                aria-pressed={isActive}
              >
                {category.name}
              </button>
            );
          })}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-bg-base to-transparent md:hidden"
        />
      </div>
    </nav>
  );
}
