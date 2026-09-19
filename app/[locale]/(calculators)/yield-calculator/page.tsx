import { Wallet } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { yieldCalculatorMetadata } from '@/config/metadata';
import { CalculatorPageHeader } from '@/components/common/calculator-page-header';
import { YieldCalculatorClient } from '@/features/calculators/yield-calculator/yield-calculator-client';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return yieldCalculatorMetadata[locale as 'ar' | 'en'];
}

export default async function YieldCalculatorPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'pages.yieldCalculator',
  });

  return (
    <div className="max-w-app mx-auto flex w-full flex-col gap-8 px-4 py-8">
      <CalculatorPageHeader
        badge={t('badge')}
        icon={Wallet}
        headline={t('headline')}
        description={t('description')}
      />
      <Suspense>
        <YieldCalculatorClient />
      </Suspense>
    </div>
  );
}
