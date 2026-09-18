const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://yieldcloud.com';

export const shared = {
  baseUrl: BASE_URL,
  applicationName: 'Yield Cloud | غيمة العائد',
  authors: [{ name: 'Yield Cloud', url: BASE_URL }],
  creator: 'Yield Cloud',
  publisher: 'Yield Cloud',
  keywords: {
    ar: [
      'غيمة العائد',
      'حاسبة مالية',
      'استثمار مصري',
      'صناديق استثمار',
      'حساب العائد',
      'رأس المال',
      'الهدف المالي',
      'APY',
      'دخل شهري',
    ],
    en: [
      'Yield Cloud',
      'financial calculator',
      'Egypt investment',
      'mutual funds',
      'yield calculator',
      'capital calculator',
      'financial goal planner',
      'APY',
      'monthly income',
    ],
  },
  twitter: {
    card: 'summary_large_image' as const,
    site: '@YieldCloud',
    creator: '@YieldCloud',
  },
};

export type LocaleMetadata = Record<'ar' | 'en', import('next').Metadata>;
