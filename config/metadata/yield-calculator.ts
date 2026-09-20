import { type LocaleMetadata, shared } from './shared';

const {
  baseUrl,
  applicationName,
  authors,
  creator,
  publisher,
  keywords,
  twitter,
} = shared;

export const yieldCalculatorMetadata: LocaleMetadata = {
  ar: {
    title: 'حاسبة العائد على الاستثمار | غيمة العائد',
    description:
      'احسب عائدك على أي استثمار في ثوانٍ. أدخل رأس المال والفائدة السنوية ومدة الاستثمار وهنحسبلك المكسب بعد الضريبة مع تفاصيل يومية وشهرية وسنوية.',
    applicationName,
    authors,
    creator,
    publisher,
    keywords: [
      ...keywords.ar,
      'حاسبة عائد استثمار',
      'ربح على الاستثمار',
      'فائدة بنكية',
      'صناديق استثمار',
      'حساب الفائدة',
      'عائد سنوي',
    ],
    openGraph: {
      title: 'حاسبة العائد على الاستثمار | غيمة العائد',
      description:
        'هتكسب كام على استثمارك؟ أدخل رأس المال والفائدة السنوية والمدة وهنحسبلك العائد الكامل بعد الضريبة — باليوم والشهر والسنة.',
      url: `${baseUrl}/ar/yield-calculator`,
      siteName: 'غيمة العائد',
      locale: 'ar_EG',
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
    twitter: {
      ...twitter,
      title: 'حاسبة العائد على الاستثمار | غيمة العائد',
      description:
        'احسب عائدك على أي استثمار بعد الضريبة مع تفاصيل يومية وشهرية وسنوية.',
      images: ['/opengraph-image'],
    },
    alternates: {
      canonical: `${baseUrl}/ar/yield-calculator`,
      languages: {
        'ar-EG': `${baseUrl}/ar/yield-calculator`,
        'en-US': `${baseUrl}/yield-calculator`,
      },
    },
  },
  en: {
    title: 'Investment Return Calculator | Yield Cloud',
    description:
      'Calculate your investment return in seconds. Enter your principal, annual yield rate, and period — we show your net gain after tax with a full daily, monthly, and yearly breakdown.',
    applicationName,
    authors,
    creator,
    publisher,
    keywords: [
      ...keywords.en,
      'investment return calculator',
      'ROI calculator',
      'interest calculator',
      'net return after tax',
      'annual yield',
      'bank deposit calculator',
    ],
    openGraph: {
      title: 'Investment Return Calculator | Yield Cloud',
      description:
        'How much will you earn on your investment? Enter your capital, APY, and duration — get your full net return breakdown instantly.',
      url: `${baseUrl}/yield-calculator`,
      siteName: 'Yield Cloud',
      locale: 'en_US',
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
    twitter: {
      ...twitter,
      title: 'Investment Return Calculator | Yield Cloud',
      description:
        'Calculate your net investment return after tax — daily, monthly, and yearly breakdown.',
      images: ['/opengraph-image'],
    },
    alternates: {
      canonical: `${baseUrl}/yield-calculator`,
      languages: {
        'ar-EG': `${baseUrl}/ar/yield-calculator`,
        'en-US': `${baseUrl}/yield-calculator`,
      },
    },
  },
};
