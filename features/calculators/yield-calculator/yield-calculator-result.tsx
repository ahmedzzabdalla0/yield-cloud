'use client';

import { Landmark, RefreshCw, Share2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/bage';
import { Button } from '@/components/ui/button';
import {
  ResultCard,
  ResultCardEyebrow,
  ResultCardFooter,
  ResultCardHeader,
  ResultCardStat,
  ResultCardStats,
} from '@/components/ui/result-card';
import { formatCurrency } from './lib';
import type { Period, YieldResult } from './types';

type YieldCalculatorResultProps = {
  result: YieldResult;
  onReset: () => void;
};

function periodReturnLabel(
  period: Period,
  t: ReturnType<typeof useTranslations>
) {
  if (period === 'day') return t('periodDay');
  if (period === 'month') return t('periodMonth');
  return t('periodYear');
}

export function YieldCalculatorResult({
  result,
  onReset,
}: YieldCalculatorResultProps) {
  const t = useTranslations('pages.yieldCalculator.result');
  const locale = useLocale();

  const {
    principal,
    perDay,
    perMonth,
    perYear,
    selectedPeriodReturn,
    selectedPeriod,
  } = result;

  function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: t('badge'),
        text: `${t('badge')}: ${formatCurrency(principal, locale)} ${t('unit')}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        `${t('badge')}: ${formatCurrency(principal, locale)} ${t('unit')} — ${window.location.href}`
      );
    }
  }

  return (
    <ResultCard>
      <ResultCardHeader>
        <Badge variant="soft-brand" size="sm">
          <Landmark />
          {t('badge')}
        </Badge>
      </ResultCardHeader>

      <div className="flex flex-col gap-1">
        <p className="text-body-sm text-muted-foreground">{t('hint')}</p>
        <div className="flex flex-wrap items-baseline gap-1.5">
          <span className="text-display-xl font-black">
            {formatCurrency(principal, locale)}
          </span>
          <span className="text-body-md text-muted-foreground">
            {t('unit')}
          </span>
        </div>
        <p className="text-body-sm text-muted-foreground">{t('disclaimer')}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <ResultCardEyebrow>{t('returnLabel')}</ResultCardEyebrow>
          <Badge variant="outline" size="sm">
            {periodReturnLabel(selectedPeriod, t)}
          </Badge>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-display-xl text-primary font-bold">
            {formatCurrency(selectedPeriodReturn, locale)}
          </span>
          <span className="text-body-md text-muted-foreground">
            {t('unit')}
          </span>
        </div>
      </div>

      <ResultCardStats>
        <ResultCardStat
          label={t('perDay')}
          value={`${formatCurrency(perDay, locale)} ${t('currencyUnit')}`}
          sublabel={t('periodDay')}
        />
        <ResultCardStat
          label={t('perMonth')}
          value={`${formatCurrency(perMonth, locale)} ${t('currencyUnit')}`}
          sublabel={t('periodMonth')}
        />
        <ResultCardStat
          label={t('perYear')}
          value={`${formatCurrency(perYear, locale)} ${t('currencyUnit')}`}
          sublabel={t('periodYear')}
        />
      </ResultCardStats>

      <ResultCardFooter>
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="gap-1.5"
        >
          <RefreshCw className="size-3.5" />
          {t('reset')}
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={handleShare}
          className="gap-1.5"
        >
          <Share2 className="size-3.5" />
          {t('share')}
        </Button>
      </ResultCardFooter>
    </ResultCard>
  );
}
