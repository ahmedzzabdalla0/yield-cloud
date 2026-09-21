import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import {
  BASE_URL,
  OG_LOCALE,
  PAGES,
  SITE_NAME,
  TWITTER_HANDLE,
} from '@/config/constants';
import type { Locale, Page, PageContent } from '@/types/seo';

export type { Locale, Page, PageContent };
export { PAGES, BASE_URL, TWITTER_HANDLE, SITE_NAME, OG_LOCALE };

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

export function urlFor(locale: Locale, page: string = ''): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  const path = page ? `/${page}` : '';
  return `${BASE_URL}${prefix}${path}`;
}

export function languagesFor(page: string = ''): Record<string, string> {
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, urlFor(l, page)])),
    'x-default': urlFor(routing.defaultLocale, page),
  };
}

export function alternatesFor(locale: Locale, page: string = '') {
  return {
    canonical: urlFor(locale, page),
    languages: languagesFor(page),
  };
}

export function openGraphImages(locale: Locale) {
  return [
    {
      url: '/opengraph-image',
      width: 1200,
      height: 630,
      alt: SITE_NAME[locale],
    },
  ];
}

export function alternateOgLocales(locale: Locale): string[] {
  return routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]);
}

export function buildPageMetadata(
  locale: Locale,
  page: Page,
  content: PageContent
): Metadata {
  return {
    title: content.title,
    description: content.description,
    alternates: alternatesFor(locale, page),
    openGraph: {
      title: content.ogTitle,
      description: content.ogDescription,
      url: urlFor(locale, page),
      siteName: SITE_NAME[locale],
      locale: OG_LOCALE[locale],
      alternateLocale: alternateOgLocales(locale),
      type: 'website',
      images: openGraphImages(locale),
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: content.ogTitle,
      description: content.twitterDescription,
      images: ['/opengraph-image'],
    },
  };
}

export function buildLocaleMetadata(
  page: Page,
  content: Record<Locale, PageContent>
): Record<Locale, Metadata> {
  return Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      buildPageMetadata(locale, page, content[locale]),
    ])
  ) as Record<Locale, Metadata>;
}

export function buildWebApplicationJsonLd(
  locale: Locale,
  page: Page,
  content: Pick<PageContent, 'title' | 'description'>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: content.title,
    description: content.description,
    url: urlFor(locale, page),
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    inLanguage: locale,
    isAccessibleForFree: true,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME[locale],
      url: BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EGP',
    },
  };
}
