import type { Locale } from '@/types/seo';

export const PAGES = ['yield-calculator', 'capital-calculator'] as const;

export const BASE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://yieldcloud.ahmedabdelsalam.dev'
).replace(/\/$/, '');

export const TWITTER_HANDLE = '@YieldCloud';

export const SITE_NAME: Record<Locale, string> = {
  en: 'Yield Cloud',
  ar: 'غيمة العائد',
};

export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  ar: 'ar_EG',
};
