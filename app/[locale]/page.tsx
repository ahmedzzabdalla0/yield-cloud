import { redirect } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';
import type { Locale } from '@/types/next-intl';

export default async function RootPage() {
  const locale = await getLocale();
  redirect({ href: '/yield-calculator', locale: locale as Locale });
}
