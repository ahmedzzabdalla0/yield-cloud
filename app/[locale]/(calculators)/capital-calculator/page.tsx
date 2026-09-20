import { PiggyBank } from 'lucide-react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { capitalCalculatorMetadata } from '@/config/metadata';
import { shared } from '@/config/metadata/shared';
import { CalculatorPageHeader } from '@/components/common/calculator-page-header';
import { JsonLd } from '@/components/common/json-ld';
import { CapitalCalculatorClient } from '@/features/calculators/capital-calculator/capital-calculator-client';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return capitalCalculatorMetadata[locale as 'ar' | 'en'];
}

export default async function CapitalCalculatorPage() {
  const locale = await getLocale();
  const t = await getTranslations('pages.capitalCalculator');
  const allMessages = await getMessages();
  const messages = {
    pages: {
      capitalCalculator: (allMessages.pages as Record<string, unknown>)
        .capitalCalculator,
    },
  };

  const isAr = locale === 'ar';
  const pageUrl = isAr
    ? `${shared.baseUrl}/ar/capital-calculator`
    : `${shared.baseUrl}/capital-calculator`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: isAr ? 'حاسبة رأس المال المطلوب' : 'Required Capital Calculator',
    description: isAr
      ? 'احسب رأس المال الدقيق اللي محتاج تستثمره عشان توصل لعائدك المستهدف — أدخل العائد المطلوب والفائدة السنوية والمدة.'
      : 'Calculate the exact capital needed to achieve your target investment return. Enter target return, APY, and period.',
    url: pageUrl,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    inLanguage: isAr ? 'ar-EG' : 'en-US',
    isAccessibleForFree: true,
    publisher: {
      '@type': 'Organization',
      name: 'Yield Cloud | غيمة العائد',
      url: shared.baseUrl,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EGP',
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="max-w-app mx-auto flex w-full flex-col gap-8 px-4 py-8">
        <CalculatorPageHeader
          badge={t('badge')}
          icon={PiggyBank}
          headline={t('headline')}
          description={t('description')}
        />
        <NextIntlClientProvider messages={messages}>
          <CapitalCalculatorClient />
        </NextIntlClientProvider>
      </div>
    </>
  );
}
