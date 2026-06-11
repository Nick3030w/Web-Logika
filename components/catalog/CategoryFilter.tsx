'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/constants/categories';
import { CategorySlug } from '@/types/product';

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('categoria') as CategorySlug | null;

  const handleFilter = (slug: CategorySlug | null) => {
    if (slug) {
      router.push(`/catalogo?categoria=${slug}`);
    } else {
      router.push('/catalogo');
    }
  };

  return (
    <nav aria-label="Filtrar por categoría">
      <div className="flex flex-wrap gap-2 md:flex-col md:gap-1">
        <button
          onClick={() => handleFilter(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 
            ${!activeCategory
              ? 'bg-accent text-white'
              : 'bg-bg-subtle text-text-muted hover:bg-gray-200'
            }`}
          aria-pressed={!activeCategory}
        >
          Todos
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleFilter(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
              ${activeCategory === cat.slug
                ? 'bg-accent text-white'
                : 'bg-bg-subtle text-text-muted hover:bg-gray-200'
              }`}
            aria-pressed={activeCategory === cat.slug}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
