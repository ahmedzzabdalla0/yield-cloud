import { routing } from '@/i18n/routing';
import type { MetadataRoute } from 'next';

const BASE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://yieldcloud.ahmedabdelsalam.dev'
).replace(/\/$/, '');

const PAGES = ['yield-calculator', 'capital-calculator'] as const;

const LAST_MODIFIED = new Date('2026-09-20');

type Locale = (typeof routing.locales)[number];

function urlFor(locale: Locale, page: string): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  const path = page ? `/${page}` : '';
  return `${BASE_URL}${prefix}${path}` || BASE_URL;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((page) => {
    const languages: Record<string, string> = {
      ...Object.fromEntries(
        routing.locales.map((locale) => [locale, urlFor(locale, page)])
      ),
      'x-default': urlFor(routing.defaultLocale, page),
    };

    return routing.locales.map((locale) => ({
      url: urlFor(locale, page),
      lastModified: LAST_MODIFIED,
      alternates: { languages },
    }));
  });
}
