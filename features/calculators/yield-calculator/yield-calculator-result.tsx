'use client';

import { Lock } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/bage';
import { CalculatorResultCard } from '@/features/calculators/shared/calculator-result-card';
import { formatCurrency, formatPercent, formatPeriod } from './lib';
import type { YieldResult } from './types';

type YieldCalculatorResultProps = {
  result: YieldResult;
  onReset: () => void;
};

const PLACEHOLDER = '00.0';

export function YieldCalculatorResult({
  result,
  onReset,
}: YieldCalculatorResultProps) {
  const t = useTranslations('pages.yieldCalculator.result');
  const locale = useLocale();

  const stats = [
    {
      label: t('perDay'),
      value: result
        ? `~ ${formatCurrency(result.perDay, locale)} ${t('currencyUnit')}`
        : PLACEHOLDER,
    },
    {
      label: t('perMonth'),
      value: result
        ? `${formatCurrency(result.perMonth, locale)} ${t('currencyUnit')}`
        : PLACEHOLDER,
    },
    {
      label: t('perYear'),
      value: result
        ? `${formatCurrency(result.perYear, locale)} ${t('currencyUnit')}`
        : PLACEHOLDER,
    },
  ];

  return (
    <CalculatorResultCard
      hasResult={!!result}
      onReset={onReset}
      resetLabel={t('reset')}
      shareLabel={t('share')}
      shareToastMessage={t('shareToast')}
      stats={stats}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Badge variant="soft-brand" size="sm">
          <Lock />
          {t('badge')}
        </Badge>
        <p className="text-body-md text-muted-foreground">{t('returnLabel')}</p>
      </div>

      <div className="flex flex-wrap items-baseline justify-center gap-2 py-4 pb-7">
        <span
          className={cn(
            'text-display-2xl font-black',
            !result && 'text-muted-foreground'
          )}
        >
          {result ? formatCurrency(result.netReturn, locale) : PLACEHOLDER}
        </span>
        <span className="text-heading-md text-muted-foreground">
          {t('unit')}
        </span>
      </div>

      <div className="bg-brand-50 border-brand-100 rounded-xl border p-4">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-body-lg text-muted-foreground">
              {t('gainLabel')}
            </span>
            <span className="text-body-lg text-foreground font-bold">
              {result
                ? formatPeriod(
                    result.periodCount,
                    result.selectedPeriod,
                    locale,
                    true
                  )
                : formatPeriod(0, 'day', locale)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'text-heading-lg text-brand-800 font-black',
                !result && 'text-brand-900/80'
              )}
            >
              {result
                ? `${formatPercent(result.gainPercent)}%`
                : `${PLACEHOLDER}%`}
            </span>
          </div>
        </div>
      </div>
    </CalculatorResultCard>
  );
}
