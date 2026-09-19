'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { useNumericInput } from '@/hooks/use-numeric-input';
import { Button } from '@/components/ui/button';
import { AmountInput } from '@/components/ui/input';
import {
  SelectInput,
  type SelectInputOption,
} from '@/components/ui/select-input';
import type { Period, TaxMode, YieldFormValues } from './types';

type YieldCalculatorFormProps = {
  onSubmit: (values: YieldFormValues) => void;
  className?: string;
};

export function YieldCalculatorForm({
  onSubmit,
  className,
}: YieldCalculatorFormProps) {
  const t = useTranslations('pages.yieldCalculator.form');
  const locale = useLocale();

  const monthlyIncome = useNumericInput({
    initial: 15_000,
    allowFloat: false,
    locale,
  });
  const apy = useNumericInput({ initial: 24, allowFloat: true, locale });
  const periodCount = useNumericInput({
    initial: 24,
    allowFloat: false,
    locale,
  });
  const taxValue = useNumericInput({ initial: 0, allowFloat: true, locale });

  const [period, setPeriod] = React.useState<Period>('day');
  const [taxMode, setTaxMode] = React.useState<TaxMode>('amount');

  const periodOptions = React.useMemo<SelectInputOption[]>(
    () => [
      { value: 'day', label: t('period.day') },
      { value: 'month', label: t('period.month') },
      { value: 'year', label: t('period.year') },
    ],
    [t]
  );

  const taxModeOptions = React.useMemo<SelectInputOption[]>(
    () => [
      { value: 'amount', label: t('tax.modeAmount') },
      { value: 'percentage', label: t('tax.modePercentage') },
    ],
    [t]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      monthlyIncome: monthlyIncome.numericValue,
      apy: apy.numericValue,
      period,
      periodCount: periodCount.numericValue || 1,
      taxMode,
      taxValue: taxValue.numericValue,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'bg-card flex flex-col gap-5 rounded-2xl border p-5',
        className
      )}
    >
      <div className="flex items-center gap-2 border-b pb-2 lg:pb-3">
        <SlidersHorizontal className="text-primary size-4 shrink-0" />
        <span className="text-body-lg font-semibold">{t('sectionLabel')}</span>
      </div>

      <AmountInput
        label={t('monthlyIncome.label')}
        placeholder={t('monthlyIncome.placeholder')}
        suffix={t('monthlyIncome.suffix')}
        value={monthlyIncome.value}
        onChange={monthlyIncome.onChange}
        inputMode="decimal"
      />

      <AmountInput
        label={t('apy.label')}
        placeholder={t('apy.placeholder')}
        suffix={t('apy.suffix')}
        value={apy.value}
        onChange={apy.onChange}
        inputMode="decimal"
      />

      <SelectInput
        label={t('period.label')}
        inputValue={periodCount.value}
        onInputChange={periodCount.onChange}
        inputMode="numeric"
        selectValue={period}
        onSelectChange={(v) => setPeriod(v as Period)}
        options={periodOptions}
      />

      <SelectInput
        label={t('tax.label')}
        inputValue={taxValue.value}
        onInputChange={taxValue.onChange}
        inputMode="decimal"
        placeholder="0"
        selectValue={taxMode}
        onSelectChange={(v) => {
          setTaxMode(v as TaxMode);
          taxValue.reset();
        }}
        options={taxModeOptions}
        helperText={taxValue.numericValue === 0 ? t('tax.noTax') : undefined}
      />

      <Button type="submit" size="lg" className="w-full">
        {t('submit')}
      </Button>
    </form>
  );
}
