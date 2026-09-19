'use client';

import { Calculator } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CalculatorTabs } from '@/components/common/calculator-tabs';

export function CalculatorsMobileBar() {
  const t = useTranslations('nav');

  return (
    <div className="border-border/60 bg-background/90 sticky top-16 z-30 border-b px-4 py-2 backdrop-blur-sm lg:hidden">
      <div className="text-muted-foreground tablet:hidden flex items-center gap-1.5 px-4 py-1.5">
        <Calculator className="size-3.5 shrink-0" />
        <span className="text-body-sm font-medium">{t('calculators')}</span>
      </div>
      <CalculatorTabs />
    </div>
  );
}
