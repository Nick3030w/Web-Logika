import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getFeatured } from '@/lib/products-loader';
import ProductCard from '@/components/catalog/ProductCard';
import Reveal from '@/components/ui/Reveal';

const MAX_FEATURED = 3;

/**
 * Featured products from the existing catalog data (featured === true).
 * Renders nothing when no product is flagged, so it never shows invented items.
 */
export default async function FeaturedProducts() {
  const featured = (await getFeatured()).slice(0, MAX_FEATURED);
  if (featured.length === 0) return null;

  return (
    <section className="section-space bg-bg-subtle" aria-labelledby="featured-title">
      <div className="section-shell">
        <Reveal className="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="featured-title" className="section-title max-w-xl">
            Piezas destacadas de nuestro taller
          </h2>
          <Link
            href="/catalogo"
            className="group inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="link-underline">Ver todo el catálogo</span>
            <ArrowUpRight
              className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              size={18}
            />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, index) => (
            <Reveal key={product.id} delay={index * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
