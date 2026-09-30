import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/products-loader';
import { BUSINESS } from '@/constants/business';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const staticRoutes = ['', '/catalogo', '/a-medida', '/nosotros', '/contacto'];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BUSINESS.website}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/catalogo' || route === '/a-medida' ? 0.9 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BUSINESS.website}/catalogo/${product.id}`,
    lastModified: product.createdAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
