import { PackageOpen } from 'lucide-react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-border bg-white px-6 py-16 text-center">
        <PackageOpen className="mx-auto text-accent-deep" size={36} />
        <p className="mt-5 font-heading text-2xl font-semibold text-primary">
          No se encontraron productos en esta categoría.
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-muted">
          Explora otra categoría o escríbenos: también podemos fabricar una
          propuesta especialmente para tu espacio.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
