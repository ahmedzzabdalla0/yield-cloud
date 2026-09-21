import type { routing } from '@/i18n/routing';
import { PAGES } from '@/config/constants';

export type Locale = (typeof routing.locales)[number];

export type Page = (typeof PAGES)[number];

export type PageContent = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  twitterDescription: string;
};
