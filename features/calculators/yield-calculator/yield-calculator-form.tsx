'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { useNumericInput } from '@/hooks/use-numeric-input';
import { useYieldFormValidation } from '@/hooks/use-yield-form-validation';
import { Button } from '@/components/ui/button';
import { AmountInput } from '@/components/ui/input';
import {
  SelectInput,
  type SelectInputOption,
} from '@/components/ui/select-input';
import type { Period, TaxMode, YieldFormValues } from './types';

type YieldCalculatorFormProps = {
  onSubmit: (values: YieldFormValues) => void;
  defaultValues?: Partial<YieldFormValues>;
  className?: string;
};

export function YieldCalculatorForm({
  onSubmit,
  defaultValues,
  className,
}: YieldCalculatorFormProps) {
  const t = useTranslations('pages.yieldCalculator.form');
  const locale = useLocale();

  const principal = useNumericInput({
    initial: defaultValues?.principal,
    allowFloat: false,
    locale,
  });
  const apy = useNumericInput({
    initial: defaultValues?.apy,
    allowFloat: true,
    locale,
  });
  const periodCount = useNumericInput({
    initial: defaultValues?.periodCount,
    allowFloat: false,
    locale,
  });
  const taxValue = useNumericInput({
    initial: defaultValues?.taxValue,
    allowFloat: true,
    locale,
  });

  const [period, setPeriod] = React.useState<Period>(
    defaultValues?.period ?? 'month'
  );
  const [taxMode, setTaxMode] = React.useState<TaxMode>(
    defaultValues?.taxMode ?? 'amount'
  );

  const { errors, validate, clearError } = useYieldFormValidation({
    required: t('validation.required'),
    principalMin: t('validation.principalMin'),
    apyMin: t('validation.apyMin'),
    apyMax: t('validation.apyMax'),
    periodCountMin: t('validation.periodCountMin'),
    taxValueMin: t('validation.taxValueMin'),
  });

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

    const values: YieldFormValues = {
      principal: principal.numericValue,
      apy: apy.numericValue,
      period,
      periodCount: periodCount.numericValue,
      taxMode,
      taxValue: taxValue.numericValue,
    };

    if (!validate(values)) return;

    onSubmit({ ...values, periodCount: values.periodCount || 1 });
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
        label={t('principal.label')}
        placeholder={t('principal.placeholder')}
        suffix={t('principal.suffix')}
        value={principal.value}
        onChange={(e) => {
          principal.onChange(e);
          clearError('principal');
        }}
        inputMode="decimal"
        errorText={errors.principal}
      />

      <AmountInput
        label={t('apy.label')}
        placeholder={t('apy.placeholder')}
        suffix={t('apy.suffix')}
        value={apy.value}
        onChange={(e) => {
          apy.onChange(e);
          clearError('apy');
        }}
        inputMode="decimal"
        errorText={errors.apy}
      />

      <SelectInput
        label={t('period.label')}
        inputValue={periodCount.value}
        onInputChange={(e) => {
          periodCount.onChange(e);
          clearError('periodCount');
        }}
        inputMode="numeric"
        placeholder={t('period.placeholder')}
        selectValue={period}
        onSelectChange={(v) => setPeriod(v as Period)}
        options={periodOptions}
        errorText={errors.periodCount}
      />

      <SelectInput
        label={t('tax.label')}
        inputValue={taxValue.value}
        onInputChange={(e) => {
          taxValue.onChange(e);
          clearError('taxValue');
        }}
        inputMode="decimal"
        placeholder={t('tax.placeholder')}
        selectValue={taxMode}
        onSelectChange={(v) => {
          setTaxMode(v as TaxMode);
          taxValue.reset();
          clearError('taxValue');
        }}
        options={taxModeOptions}
        helperText={
          !errors.taxValue && taxValue.numericValue === 0
            ? t('tax.noTax')
            : undefined
        }
        errorText={errors.taxValue}
      />

      <Button type="submit" size="lg" className="w-full">
        {t('submit')}
      </Button>
    </form>
  );
}
