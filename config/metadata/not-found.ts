import { type LocaleMetadata, shared } from './shared';

const { baseUrl, applicationName, authors, creator, publisher } = shared;

export const notFoundMetadata: LocaleMetadata = {
  ar: {
    title: 'الصفحة غير موجودة | غيمة العائد',
    description: 'هذه الصفحة غير موجودة أو تم نقلها.',
    applicationName,
    authors,
    creator,
    publisher,
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
    openGraph: {
      title: 'الصفحة غير موجودة | غيمة العائد',
      description: 'هذه الصفحة غير موجودة أو تم نقلها.',
      url: `${baseUrl}/ar`,
      siteName: 'غيمة العائد',
      locale: 'ar_EG',
      type: 'website',
    },
    twitter: {
      ...shared.twitter,
      title: 'الصفحة غير موجودة | غيمة العائد',
      description: 'هذه الصفحة غير موجودة أو تم نقلها.',
    },
  },
  en: {
    title: 'Page Not Found | Yield Cloud',
    description: "This page doesn't exist or has been moved.",
    applicationName,
    authors,
    creator,
    publisher,
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
    openGraph: {
      title: 'Page Not Found | Yield Cloud',
      description: "This page doesn't exist or has been moved.",
      url: `${baseUrl}`,
      siteName: 'Yield Cloud',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      ...shared.twitter,
      title: 'Page Not Found | Yield Cloud',
      description: "This page doesn't exist or has been moved.",
    },
  },
};
