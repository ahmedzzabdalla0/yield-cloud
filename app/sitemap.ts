import { routing } from '@/i18n/routing';
import type { MetadataRoute } from 'next';
import { PAGES, languagesFor, urlFor } from '@/lib/seo';

const LAST_MODIFIED = new Date('2026-09-20');

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((page) => {
    const languages = languagesFor(page);

    return routing.locales.map((locale) => ({
      url: urlFor(locale, page),
      lastModified: LAST_MODIFIED,
      alternates: { languages },
    }));
  });
}
