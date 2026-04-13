import { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { INTEGRATIONS } from '@/lib/integrations-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://useherald.xyz';
  
  // All documentation pages
  const pages = source.getPages();
  const docsUrls = pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const dynamicIntegrations = INTEGRATIONS.map(i => `/integrations/${i.slug}`);

  // Marketing pages (Hardcoded as they are not in Fumadocs source)
  const marketingPages = [
    '',
    '/how-it-works',
    '/for-protocols',
    '/for-users',
    '/pricing',
    '/status',
    '/privacy',
    '/terms',
    '/unauthorized',
    '/integrations',
    '/glossary',
    ...dynamicIntegrations
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  return [...marketingPages, ...docsUrls];
}
