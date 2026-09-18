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

export const aboutMetadata: LocaleMetadata = {
  ar: {
    title: 'من إحنا | غيمة العائد',
    description:
      'غيمة العائد — منصة مصرية مستقلة بتساعدك تاخد قرارات استثمارية أذكى. بنحسبلك العائد، بنوضحلك الخيارات، وبنفضل جنبك في رحلتك للحرية المالية.',
    applicationName,
    authors,
    creator,
    publisher,
    keywords: keywords.ar,
    openGraph: {
      title: 'من إحنا | غيمة العائد',
      description:
        'تعرف على غيمة العائد — رؤيتنا، رسالتنا، وإزاي بنساعد المصريين يوصلوا للحرية المالية بأدوات استثمارية شفافة وسهلة.',
      url: `${baseUrl}/ar/about`,
      siteName: 'غيمة العائد',
      locale: 'ar_EG',
      type: 'website',
    },
    twitter: {
      ...twitter,
      title: 'من إحنا | غيمة العائد',
      description: 'تعرف على غيمة العائد وإزاي بنساعدك توصل للحرية المالية.',
    },
    alternates: {
      canonical: `${baseUrl}/ar/about`,
      languages: {
        'ar-EG': `${baseUrl}/ar/about`,
        'en-US': `${baseUrl}/en/about`,
      },
    },
  },
  en: {
    title: 'About Us | Yield Cloud',
    description:
      'Yield Cloud is an independent Egyptian platform helping you make smarter investment decisions. We calculate returns, clarify your options, and stand by you on your path to financial freedom.',
    applicationName,
    authors,
    creator,
    publisher,
    keywords: keywords.en,
    openGraph: {
      title: 'About Us | Yield Cloud',
      description:
        'Learn about Yield Cloud — our vision, mission, and how we help Egyptians achieve financial freedom through transparent and accessible investment tools.',
      url: `${baseUrl}/en/about`,
      siteName: 'Yield Cloud',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      ...twitter,
      title: 'About Us | Yield Cloud',
      description:
        'Learn about Yield Cloud and how we help you achieve financial freedom.',
    },
    alternates: {
      canonical: `${baseUrl}/en/about`,
      languages: {
        'ar-EG': `${baseUrl}/ar/about`,
        'en-US': `${baseUrl}/en/about`,
      },
    },
  },
};
