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
    title: 'حساب العائد | غيمة العائد',
    description:
      'احسب رأس المال اللي محتاجه عشان تعيش من العائد. حدد دخلك الشهري وهنحسبلك المبلغ اللي تحتاجه في البنك أو الصندوق الاستثماري.',
    applicationName,
    authors,
    creator,
    publisher,
    keywords: keywords.ar,
    openGraph: {
      title: 'حاسبة الاستقلال المالي ورأس المال | غيمة العائد',
      description:
        'محتاج رأس مال كام عشان تعيش من العائد؟ احسب المبلغ الإجمالي المطلوب بناءً على دخلك الشهري ومعدل الفائدة السنوية.',
      url: `${baseUrl}/ar/yield-calculator`,
      siteName: 'غيمة العائد',
      locale: 'ar_EG',
      type: 'website',
    },
    twitter: {
      ...twitter,
      title: 'حاسبة الاستقلال المالي | غيمة العائد',
      description: 'احسب رأس المال اللي هتحتاجه عشان تعيش من عائد استثماراتك.',
    },
    alternates: {
      canonical: `${baseUrl}/ar/yield-calculator`,
      languages: {
        'ar-EG': `${baseUrl}/ar/yield-calculator`,
        'en-US': `${baseUrl}/en/yield-calculator`,
      },
    },
  },
  en: {
    title: 'Yield Calculator | Yield Cloud',
    description:
      'Calculate the capital you need to live off your investment returns. Set your target monthly income and find out how much you need in a bank or investment fund.',
    applicationName,
    authors,
    creator,
    publisher,
    keywords: keywords.en,
    openGraph: {
      title: 'Financial Independence & Capital Calculator | Yield Cloud',
      description:
        'How much capital do you need to live off your returns? Calculate the total amount required based on your monthly income target and expected APY.',
      url: `${baseUrl}/en/yield-calculator`,
      siteName: 'Yield Cloud',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      ...twitter,
      title: 'Yield Calculator | Yield Cloud',
      description:
        'Calculate how much capital you need to live off your investment returns.',
    },
    alternates: {
      canonical: `${baseUrl}/en/yield-calculator`,
      languages: {
        'ar-EG': `${baseUrl}/ar/yield-calculator`,
        'en-US': `${baseUrl}/en/yield-calculator`,
      },
    },
  },
};
