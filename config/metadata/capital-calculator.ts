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

export const capitalCalculatorMetadata: LocaleMetadata = {
  ar: {
    title: 'حاسبة رأس المال المطلوب | غيمة العائد',
    description:
      'عايز تجيب عائد معين؟ أدخل العائد المستهدف والفائدة السنوية والمدة، وهنحسبلك رأس المال الإجمالي اللي محتاج تستثمره.',
    applicationName,
    authors,
    creator,
    publisher,
    keywords: [
      ...keywords.ar,
      'رأس المال المطلوب',
      'حاسبة رأس المال',
      'عائد مستهدف',
      'كم أحتاج للاستثمار',
      'تخطيط مالي',
    ],
    openGraph: {
      title: 'حاسبة رأس المال المطلوب | غيمة العائد',
      description:
        'عايز تجيب عائد معين من استثمارك؟ حدد المبلغ المستهدف والفائدة والمدة وهنحسبلك رأس المال الدقيق اللي محتاجه.',
      url: `${baseUrl}/ar/capital-calculator`,
      siteName: 'غيمة العائد',
      locale: 'ar_EG',
      type: 'website',
    },
    twitter: {
      ...twitter,
      title: 'حاسبة رأس المال المطلوب | غيمة العائد',
      description:
        'احسب رأس المال اللي محتاج تستثمره عشان توصل لعائدك المستهدف.',
    },
    alternates: {
      canonical: `${baseUrl}/ar/capital-calculator`,
      languages: {
        'ar-EG': `${baseUrl}/ar/capital-calculator`,
        'en-US': `${baseUrl}/capital-calculator`,
      },
    },
  },
  en: {
    title: 'Required Capital Calculator | Yield Cloud',
    description:
      'Want to earn a specific return? Enter your target return, annual yield rate, and period — we calculate exactly how much capital you need to invest.',
    applicationName,
    authors,
    creator,
    publisher,
    keywords: [
      ...keywords.en,
      'required capital calculator',
      'how much to invest',
      'target return calculator',
      'investment planning',
      'reverse yield calculator',
    ],
    openGraph: {
      title: 'Required Capital Calculator | Yield Cloud',
      description:
        'How much do you need to invest to reach your target return? Enter the amount you want to earn, the APY, and the period — we do the math.',
      url: `${baseUrl}/capital-calculator`,
      siteName: 'Yield Cloud',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      ...twitter,
      title: 'Required Capital Calculator | Yield Cloud',
      description:
        'Calculate the exact capital needed to achieve your target investment return.',
    },
    alternates: {
      canonical: `${baseUrl}/capital-calculator`,
      languages: {
        'ar-EG': `${baseUrl}/ar/capital-calculator`,
        'en-US': `${baseUrl}/capital-calculator`,
      },
    },
  },
};
