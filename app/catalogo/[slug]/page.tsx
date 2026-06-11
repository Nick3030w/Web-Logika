import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { getProductBySlug, getProducts } from '@/lib/products-loader';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';
import ProductGallery from '@/components/product/ProductGallery';

export const revalidate = 3600;

interface ProductPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return { title: 'Producto no encontrado' };
  }

  const title = product.name.length > 50
    ? `${product.name.slice(0, 47)}...`
    : `${product.name} | Logika`;

  const description = product.description.length > 155
    ? product.description.slice(0, 155) + '...'
    : product.description;

  return {
    title,
    description,
    openGraph: {
      title: product.name,
      description,
      type: 'website',
      url: `/catalogo/${product.id}`,
      images: product.images.length > 0 ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const phone = process.env.WHATSAPP_PHONE || '573001234567';
  const whatsappUrl = buildWhatsAppUrl(phone, product.whatsappMsg);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Gallery */}
        <div className="lg:w-3/5">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Product info */}
        <div className="lg:w-2/5 flex flex-col">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-4">
            {product.name}
          </h1>

          <p className="text-text-muted leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Materials */}
          {product.materials.length > 0 && (
            <div className="mb-6">
              <h2 className="font-semibold text-primary mb-2">Materiales</h2>
              <ul className="list-disc list-inside text-text-muted space-y-1">
                {product.materials.map((material, idx) => (
                  <li key={idx}>{material}</li>
                ))}
              </ul>
            </div>
          )}

          {/* WhatsApp CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 mt-auto focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <MessageCircle size={20} />
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
