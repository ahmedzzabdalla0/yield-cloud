import type { Metadata } from 'next';
import { shared } from './shared';

export const layoutMetadata: Record<'ar' | 'en', Metadata> = {
  ar: {
    metadataBase: new URL(shared.baseUrl),
    title: {
      default: 'غيمة العائد',
      template: '%s | غيمة العائد',
    },
    description:
      'منصة مصرية مستقلة لحسابات الاستثمار — احسب عائدك ورأس مالك المطلوب بدقة تامة.',
    applicationName: 'غيمة العائد',
    authors: shared.authors,
    creator: shared.creator,
    publisher: 'غيمة العائد',
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
      apple: '/apple-icon.png',
    },
    openGraph: {
      title: 'غيمة العائد',
      description:
        'منصة مصرية مستقلة لحسابات الاستثمار — احسب عائدك ورأس مالك المطلوب بدقة تامة.',
      url: shared.baseUrl,
      siteName: 'غيمة العائد',
      locale: 'ar_EG',
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
    twitter: {
      ...shared.twitter,
      title: 'غيمة العائد',
      description:
        'منصة مصرية مستقلة لحسابات الاستثمار — احسب عائدك ورأس مالك المطلوب بدقة تامة.',
      images: ['/opengraph-image'],
    },
  },
  en: {
    metadataBase: new URL(shared.baseUrl),
    title: {
      default: 'Yield Cloud',
      template: '%s | Yield Cloud',
    },
    description:
      'Independent Egyptian investment calculators — compute your yield and required capital instantly.',
    applicationName: 'Yield Cloud',
    authors: shared.authors,
    creator: shared.creator,
    publisher: 'Yield Cloud',
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
      apple: '/apple-icon.png',
    },
    openGraph: {
      title: 'Yield Cloud',
      description:
        'Independent Egyptian investment calculators — compute your yield and required capital instantly.',
      url: shared.baseUrl,
      siteName: 'Yield Cloud',
      locale: 'en_US',
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
    twitter: {
      ...shared.twitter,
      title: 'Yield Cloud',
      description:
        'Independent Egyptian investment calculators — compute your yield and required capital instantly.',
      images: ['/opengraph-image'],
    },
  },
};
