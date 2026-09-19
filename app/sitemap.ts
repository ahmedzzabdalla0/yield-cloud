import type { MetadataRoute } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://yieldcloud.ahmedabdelsalam.dev';

const PAGES = ['yield-calculator', 'capital-calculator'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PAGES) {
    entries.push({
      url: `${BASE_URL}/${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          'ar-EG': `${BASE_URL}/ar/${page}`,
          'en-US': `${BASE_URL}/${page}`,
        },
      },
    });
  }

  return entries;
}
