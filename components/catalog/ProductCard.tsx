import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Product } from '@/types/product';
import { BUSINESS } from '@/constants/business';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';

interface ProductCardProps {
  product: Product;
}

const priceFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

export default function ProductCard({ product }: ProductCardProps) {
  const quoteOnly = product.salesMode === 'quote' || product.category === 'medida';
  const whatsappMessage = quoteOnly
    ? `Hola Logika, quiero una cotización personalizada basada en ${product.name}.`
    : product.whatsappMsg;
  const whatsappUrl = buildWhatsAppUrl(BUSINESS.whatsappPhone, whatsappMessage);
  const truncatedDescription =
    product.description.length > 120
      ? `${product.description.slice(0, 117)}...`
      : product.description;

  return (
    <article className="group overflow-hidden rounded-[1.4rem] border border-border/80 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link
        href={`/catalogo/${product.id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-bg-subtle">
          <Image
            src={product.images[0] || '/placeholder/product-1.svg'}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] backdrop-blur ${
            quoteOnly
              ? 'bg-primary/90 text-accent'
              : 'bg-white/90 text-primary'
          }`}>
            {quoteOnly ? 'Cotización personalizada' : 'Disponible por pedido'}
          </span>
        </div>

        <div className="p-5 pb-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-heading text-xl font-semibold text-primary">
              {product.name}
            </h3>
            <ArrowUpRight className="mt-1 flex-shrink-0 text-accent-deep transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={18} />
          </div>
          <p className="mt-2 text-sm leading-6 text-text-muted">{truncatedDescription}</p>
          <div className="mt-4 flex items-end justify-between gap-3 border-t border-border/70 pt-4">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.15em] text-text-muted">
                {product.price ? 'Precio' : quoteOnly ? 'Valor' : 'Compra'}
              </p>
              <p className="mt-1 text-sm font-semibold text-primary">
                {product.price
                  ? priceFormatter.format(product.price)
                  : quoteOnly
                    ? 'Según tu proyecto'
                    : 'Confirmar por WhatsApp'}
              </p>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-full bg-bg-subtle px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          aria-label={`${quoteOnly ? 'Cotizar' : 'Comprar'} ${product.name} por WhatsApp`}
        >
          <MessageCircle size={17} />
          {quoteOnly ? 'Cotizar por WhatsApp' : 'Consultar y comprar'}
        </a>
      </div>
    </article>
  );
}
