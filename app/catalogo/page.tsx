import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MessageCircle, Ruler } from 'lucide-react';
import { CategorySlug } from '@/types/product';
import { getProducts, getProductsByCategory } from '@/lib/products-loader';
import CategoryFilter from '@/components/catalog/CategoryFilter';
import ProductGrid from '@/components/catalog/ProductGrid';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';
import { BUSINESS, CUSTOM_QUOTE_MESSAGE } from '@/constants/business';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Catálogo de muebles',
  description:
    'Explora sofás, camas, comedores y diseños personalizados. Compra o solicita una cotización a medida directamente por WhatsApp.',
  alternates: { canonical: '/catalogo' },
};

interface CatalogPageProps {
  searchParams: { categoria?: string };
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const category = searchParams.categoria as CategorySlug | undefined;
  const products = category
    ? await getProductsByCategory(category)
    : await getProducts();
  const quoteUrl = buildWhatsAppUrl(BUSINESS.whatsappPhone, CUSTOM_QUOTE_MESSAGE);

  return (
    <>
      <header className="border-b border-border bg-bg-subtle">
        <div className="section-shell py-14 sm:py-20">
          <p className="eyebrow">Referencias y proyectos</p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <h1 className="display-title">Catálogo Logika</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-text-muted sm:text-lg">
                Encuentra una referencia para comprar o descubre ideas que podemos
                adaptar. Toda compra y cotización se confirma directamente con
                nuestro equipo por WhatsApp.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <MessageCircle size={20} className="text-accent-deep" />
                <p className="mt-3 text-sm font-semibold">Referencias por pedido</p>
                <p className="mt-1 text-xs leading-5 text-text-muted">Confirma precio, opciones y entrega.</p>
              </div>
              <a
                href={quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-primary p-4 text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <Ruler size={20} className="text-accent" />
                <p className="mt-3 text-sm font-semibold">Diseños a medida</p>
                <p className="mt-1 text-xs leading-5 text-white/60">Valor según cotización personalizada.</p>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="section-space">
        <div className="section-shell flex flex-col gap-8 md:flex-row md:items-start">
          <aside className="md:sticky md:top-28 md:w-52 md:flex-shrink-0">
            <Suspense fallback={null}>
              <CategoryFilter />
            </Suspense>
          </aside>
          <div className="min-w-0 flex-1">
            <ProductGrid products={products} />
          </div>
        </div>
      </section>
    </>
  );
}
