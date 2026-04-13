import { MetadataRoute } from 'next';
import { source } from '@/lib/source';

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

  // Marketing pages (Hardcoded as they are not in Fumadocs source)
  const marketingPages = [
    '',
    '/how-it-works',
    '/for-protocols',
    '/for-users',
    '/pricing',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  return [...marketingPages, ...docsUrls];
}
