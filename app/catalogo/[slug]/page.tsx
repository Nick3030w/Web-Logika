import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Clock3, MessageCircle, Ruler } from 'lucide-react';
import { getProductBySlug, getProducts } from '@/lib/products-loader';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';
import ProductGallery from '@/components/product/ProductGallery';
import { BUSINESS } from '@/constants/business';

export const revalidate = 3600;

interface ProductPageProps {
  params: { slug: string };
}

const priceFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Producto no encontrado' };

  return {
    title: product.name,
    description: product.description.slice(0, 155),
    alternates: { canonical: `/catalogo/${product.id}` },
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 155),
      type: 'website',
      url: `/catalogo/${product.id}`,
      images: product.images[0] ? [{ url: product.images[0], alt: product.name }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const quoteOnly = product.salesMode === 'quote' || product.category === 'medida';
  const message = quoteOnly
    ? `Hola Logika, quiero una cotización personalizada basada en ${product.name}. Mi espacio mide aproximadamente: `
    : product.whatsappMsg;
  const whatsappUrl = buildWhatsAppUrl(BUSINESS.whatsappPhone, message);

  return (
    <article className="section-space">
      <div className="section-shell">
        <Link
          href="/catalogo"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-text-muted transition hover:text-accent-deep focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <ArrowLeft size={17} /> Volver al catálogo
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.85fr] lg:gap-14">
          <ProductGallery
            images={product.images}
            videos={product.videos}
            productName={product.name}
          />

          <div className="flex flex-col lg:py-2">
            <span className="w-fit rounded-full bg-bg-subtle px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent-deep">
              {quoteOnly ? 'Diseño con cotización personalizada' : 'Referencia disponible por pedido'}
            </span>
            <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight tracking-[-0.025em] text-primary sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 leading-7 text-text-muted">{product.description}</p>

            <div className="mt-7 border-y border-border py-5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
                {product.price ? 'Precio' : quoteOnly ? 'Valor del proyecto' : 'Compra'}
              </p>
              <p className="mt-2 font-heading text-2xl font-semibold text-primary">
                {product.price
                  ? priceFormatter.format(product.price)
                  : quoteOnly
                    ? 'Cotización según medidas y acabados'
                    : 'Precio y disponibilidad por WhatsApp'}
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-2xl bg-bg-subtle p-4">
                <Ruler size={20} className="text-accent-deep" />
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Medidas</p>
                <p className="mt-1 text-sm font-medium">{product.dimensions || (quoteOnly ? 'Definidas para tu espacio' : 'Consultar opciones')}</p>
              </div>
              <div className="rounded-2xl bg-bg-subtle p-4">
                <Clock3 size={20} className="text-accent-deep" />
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Fabricación</p>
                <p className="mt-1 text-sm font-medium">{product.leadTime || 'Tiempo por confirmar'}</p>
              </div>
            </div>

            {product.materials.length > 0 && (
              <div className="mt-7">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Materiales</h2>
                <ul className="mt-3 space-y-2">
                  {product.materials.map((material) => (
                    <li key={material} className="flex items-center gap-2 text-sm text-text-muted">
                      <Check size={16} className="text-accent-deep" /> {material}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary mt-8 w-full"
            >
              <MessageCircle size={20} />
              {quoteOnly ? 'Solicitar cotización personalizada' : 'Consultar y comprar por WhatsApp'}
            </a>
            <p className="mt-3 text-center text-xs leading-5 text-text-muted">
              Te atenderá una persona de nuestro equipo para confirmar todos los detalles.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
