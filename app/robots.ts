import { MetadataRoute } from 'next';
import { BUSINESS_CONFIG } from '@/lib/config/business';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/projects/*'],
    },
    sitemap: `${BUSINESS_CONFIG.intendedDomain}/sitemap.xml`,
  };
}
