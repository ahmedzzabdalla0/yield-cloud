import type { Metadata } from 'next';
import { BASE_URL, type Locale } from '@/lib/seo';

export type LocaleMetadata = Record<Locale, Metadata>;

export const shared = {
  applicationName: 'Yield Cloud | غيمة العائد',
  creator: 'Yield Cloud',
  authors: [{ name: 'Yield Cloud', url: BASE_URL }],
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
} satisfies Metadata;
