'use client';

import { Lock, RefreshCw, Share2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Badge } from '@/components/ui/bage';
import { Button } from '@/components/ui/button';
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
  const { copy } = useCopyToClipboard();

  async function handleShare() {
    const success = await copy(window.location.href);
    if (success) toast.success(t('shareToast'));
  }

  return (
    <div
      className="bg-card flex flex-col overflow-hidden rounded-2xl border p-5"
      style={{
        background:
          'linear-gradient(to bottom, color-mix(in oklch, var(--color-brand-500) 8%, transparent) 0%, var(--color-card) 30%)',
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <Badge variant="soft-brand" size="sm">
          <Lock />
          {t('badge')}
        </Badge>
        <p className="text-body-md text-muted-foreground">{t('returnLabel')}</p>
      </div>

      {/* Yeild amount */}
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

      {/* Gain section */}
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

      {/* Stats */}
      <div className="my-9 grid grid-cols-2 sm:grid-cols-3">
        {(
          [
            { label: t('perDay'), value: result?.perDay, prefix: '~ ' },
            { label: t('perMonth'), value: result?.perMonth, prefix: '' },
            { label: t('perYear'), value: result?.perYear, prefix: '' },
          ] as const
        ).map(({ label, value, prefix }, i, arr) => (
          <div
            key={label}
            className={cn(
              'flex flex-col items-center gap-0.5 p-4',
              i === 0 &&
                'col-span-2 border-b pt-0 sm:col-span-1 sm:border-b-0 sm:pt-4',
              i < arr.length - 1 && 'sm:border-e',
              i === 1 && 'border-e'
            )}
          >
            <span className="text-body-sm text-muted-foreground">{label}</span>
            <span className="text-heading-sm font-semibold">
              {value != null
                ? `${prefix}${formatCurrency(value, locale)} ${t('currencyUnit')}`
                : PLACEHOLDER}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="lg"
          onClick={handleShare}
          disabled={!result}
          className="h-fit flex-1 gap-1.5 py-2"
        >
          <Share2 className="size-4" />
          {t('share')}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onReset}
          disabled={!result}
          className="h-fit gap-1.5 py-2"
        >
          <RefreshCw className="size-3.5" />
          {t('reset')}
        </Button>
      </div>
    </div>
  );
}
