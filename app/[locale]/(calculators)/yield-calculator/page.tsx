import { Wallet } from 'lucide-react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { yieldCalculatorMetadata } from '@/config/metadata';
import { shared } from '@/config/metadata/shared';
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

  const isAr = locale === 'ar';
  const pageUrl = isAr
    ? `${shared.baseUrl}/ar/yield-calculator`
    : `${shared.baseUrl}/yield-calculator`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: isAr ? 'حاسبة العائد على الاستثمار' : 'Investment Return Calculator',
    description: isAr
      ? 'احسب عائدك على أي استثمار في ثوانٍ — أدخل رأس المال والفائدة السنوية والمدة واحصل على تفاصيل العائد بعد الضريبة.'
      : 'Calculate your investment return in seconds. Enter principal, APY, and period to get your full net return breakdown.',
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
