'use client';

import { useLocale, useTranslations } from 'next-intl';
import * as React from 'react';
import { useFormValidation } from '@/hooks/use-form-validation';
import { useNumericInput } from '@/hooks/use-numeric-input';
import { AmountInput } from '@/components/ui/input';
import {
  SelectInput,
  type SelectInputOption,
} from '@/components/ui/select-input';
import { CalculatorFormCard } from '@/features/calculators/shared/calculator-form-card';
import type { Period, TaxMode, YieldFormValues } from './types';

type YieldCalculatorFormProps = {
  onSubmit: (values: YieldFormValues) => void;
  defaultValues?: Partial<YieldFormValues>;
};

export function YieldCalculatorForm({
  onSubmit,
  defaultValues,
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

  const { errors, validate, clearError } = useFormValidation<YieldFormValues>([
    {
      field: 'principal',
      validate: (val) => {
        const n = val as number;
        if (!n || n <= 0)
          return n < 0
            ? t('validation.principalMin')
            : t('validation.required');
      },
    },
    {
      field: 'apy',
      validate: (val) => {
        const n = val as number;
        if (!n || n <= 0)
          return n < 0 ? t('validation.apyMin') : t('validation.required');
        if (n > 100) return t('validation.apyMax');
      },
    },
    {
      field: 'periodCount',
      validate: (val) => {
        const n = val as number;
        if (!n || n <= 0)
          return n < 0
            ? t('validation.periodCountMin')
            : t('validation.required');
      },
    },
    {
      field: 'taxValue',
      validate: (val) => {
        if ((val as number) < 0) return t('validation.taxValueMin');
      },
    },
  ]);

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
    <CalculatorFormCard
      sectionLabel={t('sectionLabel')}
      submitLabel={t('submit')}
      onSubmit={handleSubmit}
    >
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
    </CalculatorFormCard>
  );
}
