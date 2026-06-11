import { Metadata } from 'next';
import { Suspense } from 'react';
import { CategorySlug } from '@/types/product';
import { getProducts, getProductsByCategory } from '@/lib/products-loader';
import CategoryFilter from '@/components/catalog/CategoryFilter';
import ProductGrid from '@/components/catalog/ProductGrid';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Catálogo | Logika Decoración',
  description:
    'Explora nuestro catálogo de muebles a medida: sofás, camas, comedores, sofacamas, cortinería, sillas y diseños personalizados.',
  openGraph: {
    title: 'Catálogo | Logika Decoración',
    description:
      'Explora nuestro catálogo de muebles a medida: sofás, camas, comedores y más.',
    type: 'website',
    url: '/catalogo',
  },
};

interface CatalogPageProps {
  searchParams: { categoria?: string };
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const category = searchParams.categoria as CategorySlug | undefined;

  const products = category
    ? await getProductsByCategory(category)
    : await getProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-8">
        Catálogo
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="md:w-48 flex-shrink-0">
          <Suspense fallback={null}>
            <CategoryFilter />
          </Suspense>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
