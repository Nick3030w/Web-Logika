import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const truncatedDescription =
    product.description.length > 120
      ? product.description.slice(0, 120) + '...'
      : product.description;

  return (
    <Link
      href={`/catalogo/${product.id}`}
      className="group block bg-white rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-subtle">
        <Image
          src={product.images[0] || '/placeholder/product-1.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg font-semibold text-primary mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-text-muted line-clamp-3">
          {truncatedDescription}
        </p>
      </div>
    </Link>
  );
}
