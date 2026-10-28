import { MetadataRoute } from 'next';
import { BUSINESS_CONFIG } from '@/lib/config/business';
import { SERVICES_DATA } from '@/lib/data/services';
import { PROJECT_ITEMS } from '@/lib/data/projects-and-faqs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BUSINESS_CONFIG.intendedDomain;
  const lastModified = new Date('2026-10-27T00:00:00.000Z');

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/our-process`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service-areas`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/request-estimate`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES_DATA.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: service.featuredOnHome ? 0.9 : 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = BUSINESS_CONFIG.credentials.hasRealApprovedProjects
    ? PROJECT_ITEMS.filter((project) => !project.isIllustrativePreview).map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.75,
      }))
    : [];

  return [...coreRoutes, ...serviceRoutes, ...projectRoutes];
}
