import { type Locale, type PageContent, buildLocaleMetadata } from '@/lib/seo';

export const capitalCalculatorContent: Record<Locale, PageContent> = {
  ar: {
    title: 'حاسبة رأس المال المطلوب',
    description:
      'عايز تجيب عائد معين؟ أدخل العائد المستهدف والفائدة السنوية والمدة، وهنحسبلك رأس المال الإجمالي اللي محتاج تستثمره.',
    ogTitle: 'حاسبة رأس المال المطلوب | غيمة العائد',
    ogDescription:
      'عايز تجيب عائد معين من استثمارك؟ حدد المبلغ المستهدف والفائدة والمدة وهنحسبلك رأس المال الدقيق اللي محتاجه.',
    twitterDescription:
      'احسب رأس المال اللي محتاج تستثمره عشان توصل لعائدك المستهدف.',
  },
  en: {
    title: 'Required Capital Calculator',
    description:
      'Want to earn a specific return? Enter your target return, annual yield rate, and period — we calculate exactly how much capital you need to invest.',
    ogTitle: 'Required Capital Calculator | Yield Cloud',
    ogDescription:
      'How much do you need to invest to reach your target return? Enter the amount you want to earn, the APY, and the period — we do the math.',
    twitterDescription:
      'Calculate the exact capital needed to achieve your target investment return.',
  },
};

export const capitalCalculatorMetadata = buildLocaleMetadata(
  'capital-calculator',
  capitalCalculatorContent
);
