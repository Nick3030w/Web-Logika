import type { MetadataRoute } from 'next';
import { BUSINESS } from '@/constants/business';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BUSINESS.website}/sitemap.xml`,
  };
}
