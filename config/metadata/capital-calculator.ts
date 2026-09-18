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
    title: 'رأس المال | غيمة العائد',
    description:
      'عايز دخل شهري كام؟ احسب رأس المال المطلوب وتفاصيل العائد حسب المدة والدورية — هنريحك لحد الضبط.',
    applicationName,
    authors,
    creator,
    publisher,
    keywords: keywords.ar,
    openGraph: {
      title: 'حاسبة الدخل الشهري والحرية المالية | غيمة العائد',
      description:
        'حدد الدخل الشهري اللي بتحلم بيه واحسب رأس المال المطلوب مع تفاصيل العائد اليومي والشهري والسنوي.',
      url: `${baseUrl}/ar/capital-calculator`,
      siteName: 'غيمة العائد',
      locale: 'ar_EG',
      type: 'website',
    },
    twitter: {
      ...twitter,
      title: 'حاسبة الدخل الشهري | غيمة العائد',
      description:
        'احسب رأس المال اللي محتاجه عشان توصل لدخلك الشهري المستهدف.',
    },
    alternates: {
      canonical: `${baseUrl}/ar/capital-calculator`,
      languages: {
        'ar-EG': `${baseUrl}/ar/capital-calculator`,
        'en-US': `${baseUrl}/en/capital-calculator`,
      },
    },
  },
  en: {
    title: 'Capital Calculator | Yield Cloud',
    description:
      'What monthly income are you aiming for? Calculate the required capital and full return breakdown by duration and frequency.',
    applicationName,
    authors,
    creator,
    publisher,
    keywords: keywords.en,
    openGraph: {
      title: 'Monthly Income & Financial Freedom Calculator | Yield Cloud',
      description:
        'Set your target monthly income and calculate the capital required, with daily, monthly, and annual return breakdowns.',
      url: `${baseUrl}/en/capital-calculator`,
      siteName: 'Yield Cloud',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      ...twitter,
      title: 'Capital Calculator | Yield Cloud',
      description:
        'Calculate the capital required to reach your target monthly income.',
    },
    alternates: {
      canonical: `${baseUrl}/en/capital-calculator`,
      languages: {
        'ar-EG': `${baseUrl}/ar/capital-calculator`,
        'en-US': `${baseUrl}/en/capital-calculator`,
      },
    },
  },
};
