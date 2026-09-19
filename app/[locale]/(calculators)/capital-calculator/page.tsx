import { PiggyBank } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { capitalCalculatorMetadata } from '@/config/metadata';
import { CalculatorPageHeader } from '@/components/common/calculator-page-header';
import { CapitalCalculatorClient } from '@/features/calculators/capital-calculator/capital-calculator-client';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return capitalCalculatorMetadata[locale as 'ar' | 'en'];
}

export default async function CapitalCalculatorPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'pages.capitalCalculator',
  });

  return (
    <div className="max-w-app mx-auto flex w-full flex-col gap-8 px-4 py-8">
      <CalculatorPageHeader
        badge={t('badge')}
        icon={PiggyBank}
        headline={t('headline')}
        description={t('description')}
      />
      <Suspense>
        <CapitalCalculatorClient />
      </Suspense>
    </div>
  );
}
