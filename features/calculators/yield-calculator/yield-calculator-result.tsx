'use client';

import { RefreshCw, Share2, TrendingUp } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
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
import { formatCurrency, formatPercent } from './lib';
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
  const { copy } = useCopyToClipboard();

  async function handleShare() {
    const success = await copy(window.location.href);
    if (success) toast.success(t('shareToast'));
  }

  return (
    <ResultCard>
      <ResultCardHeader>
        <Badge variant="soft-brand" size="sm">
          <TrendingUp />
          {t('badge')}
        </Badge>
      </ResultCardHeader>

      <div className="flex flex-col gap-1">
        <p className="text-body-sm text-muted-foreground">{t('returnLabel')}</p>
        <div className="flex flex-wrap items-baseline gap-1.5">
          <span
            className={`text-display-xl font-black${!result ? 'text-muted-foreground' : ''}`}
          >
            {result ? formatCurrency(result.netReturn, locale) : PLACEHOLDER}
          </span>
          <span className="text-body-md text-muted-foreground">
            {t('unit')}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <ResultCardEyebrow>{t('gainLabel')}</ResultCardEyebrow>
          <span
            className={`text-body-sm font-semibold${result ? 'text-primary' : 'text-muted-foreground'}`}
          >
            {result
              ? `${formatPercent(result.gainPercent)}%`
              : `${PLACEHOLDER}%`}
          </span>
        </div>
      </div>

      <ResultCardStats>
        <ResultCardStat
          label={t('perDay')}
          value={
            result
              ? `${formatCurrency(result.perDay, locale)} ${t('currencyUnit')}`
              : PLACEHOLDER
          }
          sublabel={t('periodDay')}
        />
        <ResultCardStat
          label={t('perMonth')}
          value={
            result
              ? `${formatCurrency(result.perMonth, locale)} ${t('currencyUnit')}`
              : PLACEHOLDER
          }
          sublabel={t('periodMonth')}
        />
        <ResultCardStat
          label={t('perYear')}
          value={
            result
              ? `${formatCurrency(result.perYear, locale)} ${t('currencyUnit')}`
              : PLACEHOLDER
          }
          sublabel={t('periodYear')}
        />
      </ResultCardStats>

      <ResultCardFooter>
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          disabled={!result}
          className="gap-1.5"
        >
          <RefreshCw className="size-3.5" />
          {t('reset')}
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={handleShare}
          disabled={!result}
          className="gap-1.5"
        >
          <Share2 className="size-3.5" />
          {t('share')}
        </Button>
      </ResultCardFooter>
    </ResultCard>
  );
}
