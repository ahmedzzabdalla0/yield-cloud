import { Wallet } from 'lucide-react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import {
  yieldCalculatorContent,
  yieldCalculatorMetadata,
} from '@/config/metadata';
import { buildWebApplicationJsonLd } from '@/lib/seo';
import { CalculatorPageHeader } from '@/components/common/calculator-page-header';
import { JsonLd } from '@/components/common/json-ld';
import { YieldCalculatorClient } from '@/features/calculators/yield-calculator/yield-calculator-client';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return yieldCalculatorMetadata[locale as 'ar' | 'en'];
}

export default async function YieldCalculatorPage() {
  const locale = await getLocale();
  const t = await getTranslations('pages.yieldCalculator');
  const allMessages = await getMessages();
  const messages = {
    pages: {
      yieldCalculator: (allMessages.pages as Record<string, unknown>)
        .yieldCalculator,
    },
  };

  const jsonLd = buildWebApplicationJsonLd(
    locale,
    'yield-calculator',
    yieldCalculatorContent[locale]
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="max-w-app mx-auto flex w-full flex-col gap-8 px-4 py-8">
        <CalculatorPageHeader
          badge={t('badge')}
          icon={Wallet}
          headline={t('headline')}
          description={t('description')}
        />
        <NextIntlClientProvider messages={messages}>
          <YieldCalculatorClient />
        </NextIntlClientProvider>
      </div>
    </>
  );
}
