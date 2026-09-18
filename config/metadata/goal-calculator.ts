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

export const goalCalculatorMetadata: LocaleMetadata = {
  ar: {
    title: 'الهدف المالي | غيمة العائد',
    description:
      'هتوصل لهدفك المالي إمتى وإزاي؟ حدد هدفك ومبلغك الحالي وهنحسبلك خطة التوفير والاستثمار الذكي شهراً بشهر.',
    applicationName,
    authors,
    creator,
    publisher,
    keywords: keywords.ar,
    openGraph: {
      title: 'خطة التوفير والاستثمار الذكي | غيمة العائد',
      description:
        'احسب خطة التوفير اللازمة للوصول لهدفك المالي. حدد المبلغ المستهدف والمدة الزمنية وهنريحك في باقي الحسابات.',
      url: `${baseUrl}/ar/goal-calculator`,
      siteName: 'غيمة العائد',
      locale: 'ar_EG',
      type: 'website',
    },
    twitter: {
      ...twitter,
      title: 'حاسبة الهدف المالي | غيمة العائد',
      description:
        'خطط لهدفك المالي واعرف المبلغ اللي محتاج توفره شهرياً للوصول إليه.',
    },
    alternates: {
      canonical: `${baseUrl}/ar/goal-calculator`,
      languages: {
        'ar-EG': `${baseUrl}/ar/goal-calculator`,
        'en-US': `${baseUrl}/en/goal-calculator`,
      },
    },
  },
  en: {
    title: 'Financial Goal Planner | Yield Cloud',
    description:
      'When and how will you reach your financial goal? Set your target, current savings, and timeline — we calculate your smart savings and investment plan.',
    applicationName,
    authors,
    creator,
    publisher,
    keywords: keywords.en,
    openGraph: {
      title: 'Smart Savings & Investment Goal Planner | Yield Cloud',
      description:
        'Calculate the savings plan needed to hit your financial goal. Set your target amount, current balance, and timeframe — we handle the rest.',
      url: `${baseUrl}/en/goal-calculator`,
      siteName: 'Yield Cloud',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      ...twitter,
      title: 'Financial Goal Planner | Yield Cloud',
      description:
        'Plan your financial goal and find out how much to save monthly to get there.',
    },
    alternates: {
      canonical: `${baseUrl}/en/goal-calculator`,
      languages: {
        'ar-EG': `${baseUrl}/ar/goal-calculator`,
        'en-US': `${baseUrl}/en/goal-calculator`,
      },
    },
  },
};
