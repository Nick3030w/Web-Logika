'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/constants/categories';
import { CategorySlug } from '@/types/product';

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('categoria') as CategorySlug | null;

  const handleFilter = (slug: CategorySlug | null) => {
    router.push(slug ? `/catalogo?categoria=${slug}` : '/catalogo');
  };

  return (
    <nav aria-label="Filtrar por categoría">
      <p className="mb-4 hidden text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-text-muted md:block">
        Categorías
      </p>
      <div className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
        <button
          onClick={() => handleFilter(null)}
          className={`min-h-11 flex-shrink-0 rounded-full px-4 py-2 text-left text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-accent ${
            !activeCategory
              ? 'bg-primary text-white'
              : 'bg-white text-text-muted hover:bg-bg-subtle hover:text-primary'
          }`}
          aria-pressed={!activeCategory}
        >
          Todos
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleFilter(category.slug)}
            className={`min-h-11 flex-shrink-0 rounded-full px-4 py-2 text-left text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-accent ${
              activeCategory === category.slug
                ? 'bg-primary text-white'
                : 'bg-white text-text-muted hover:bg-bg-subtle hover:text-primary'
            }`}
            aria-pressed={activeCategory === category.slug}
          >
            {category.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
