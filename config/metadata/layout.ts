import type { Metadata } from 'next';
import {
  BASE_URL,
  type Locale,
  OG_LOCALE,
  SITE_NAME,
  TWITTER_HANDLE,
  alternateOgLocales,
  openGraphImages,
} from '@/lib/seo';
import { type LocaleMetadata, shared } from './shared';

const descriptions: Record<Locale, string> = {
  ar: 'منصة مصرية مستقلة لحسابات الاستثمار — احسب عائدك ورأس مالك المطلوب بدقة تامة.',
  en: 'Independent Egyptian investment calculators — compute your yield and required capital instantly.',
};

function buildLayoutMetadata(locale: Locale): Metadata {
  const siteName = SITE_NAME[locale];
  const description = descriptions[locale];

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    applicationName: shared.applicationName,
    authors: shared.authors,
    creator: shared.creator,
    publisher: siteName,
    robots: shared.robots,
    icons: shared.icons,
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
    openGraph: {
      title: siteName,
      description,
      siteName,
      locale: OG_LOCALE[locale],
      alternateLocale: alternateOgLocales(locale),
      type: 'website',
      images: openGraphImages(locale),
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: siteName,
      description,
      images: ['/opengraph-image'],
    },
  };
}

export const layoutMetadata: LocaleMetadata = {
  ar: buildLayoutMetadata('ar'),
  en: buildLayoutMetadata('en'),
};
