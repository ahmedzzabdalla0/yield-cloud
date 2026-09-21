import { PiggyBank } from 'lucide-react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import {
  capitalCalculatorContent,
  capitalCalculatorMetadata,
} from '@/config/metadata';
import { buildWebApplicationJsonLd } from '@/lib/seo';
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

  const jsonLd = buildWebApplicationJsonLd(
    locale,
    'capital-calculator',
    capitalCalculatorContent[locale]
  );

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
