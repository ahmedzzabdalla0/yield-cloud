import { type Locale, type PageContent, buildLocaleMetadata } from '@/lib/seo';

export const yieldCalculatorContent: Record<Locale, PageContent> = {
  ar: {
    title: 'حاسبة العائد على الاستثمار',
    description:
      'احسب عائدك على أي استثمار في ثوانٍ. أدخل رأس المال والفائدة السنوية ومدة الاستثمار وهنحسبلك المكسب بعد الضريبة مع تفاصيل يومية وشهرية وسنوية.',
    ogTitle: 'حاسبة العائد على الاستثمار | غيمة العائد',
    ogDescription:
      'هتكسب كام على استثمارك؟ أدخل رأس المال والفائدة السنوية والمدة وهنحسبلك العائد الكامل بعد الضريبة — باليوم والشهر والسنة.',
    twitterDescription:
      'احسب عائدك على أي استثمار بعد الضريبة مع تفاصيل يومية وشهرية وسنوية.',
  },
  en: {
    title: 'Investment Return Calculator',
    description:
      'Calculate your investment return in seconds. Enter your principal, annual yield rate, and period — we show your net gain after tax with a full daily, monthly, and yearly breakdown.',
    ogTitle: 'Investment Return Calculator | Yield Cloud',
    ogDescription:
      'How much will you earn on your investment? Enter your capital, APY, and duration — get your full net return breakdown instantly.',
    twitterDescription:
      'Calculate your net investment return after tax — daily, monthly, and yearly breakdown.',
  },
};

export const yieldCalculatorMetadata = buildLocaleMetadata(
  'yield-calculator',
  yieldCalculatorContent
);
