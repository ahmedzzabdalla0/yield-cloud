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
import type { CapitalFormValues, Period, TaxMode } from './types';

type CapitalCalculatorFormProps = {
  onSubmit: (values: CapitalFormValues) => void;
  defaultValues?: Partial<CapitalFormValues>;
};

const MAX_TARGET_RETURN = 100_000_000;
const MAX_PERIOD_COUNT = 3_650;
const MAX_APY = 100;
const MAX_TAX_PERCENTAGE = 99.99;

export function CapitalCalculatorForm({
  onSubmit,
  defaultValues,
}: CapitalCalculatorFormProps) {
  const t = useTranslations('pages.capitalCalculator.form');
  const locale = useLocale();

  const [period, setPeriod] = React.useState<Period>(
    defaultValues?.period ?? 'month'
  );
  const [taxMode, setTaxMode] = React.useState<TaxMode>(
    defaultValues?.taxMode ?? 'amount'
  );

  const targetReturn = useNumericInput({
    initial: defaultValues?.targetReturn,
    allowFloat: false,
    locale,
    max: MAX_TARGET_RETURN,
  });
  const apy = useNumericInput({
    initial: defaultValues?.apy,
    allowFloat: true,
    locale,
    max: MAX_APY,
  });
  const periodCount = useNumericInput({
    initial: defaultValues?.periodCount,
    allowFloat: false,
    locale,
    max: MAX_PERIOD_COUNT,
  });
  const taxValue = useNumericInput({
    initial: defaultValues?.taxValue,
    allowFloat: true,
    locale,
    max: taxMode === 'percentage' ? MAX_TAX_PERCENTAGE : undefined,
  });

  const { errors, validate, clearError } = useFormValidation<CapitalFormValues>(
    [
      {
        field: 'targetReturn',
        validate: (val) => {
          const n = val as number;
          if (!n || n <= 0) return t('validation.required');
          if (n > MAX_TARGET_RETURN) return t('validation.targetReturnMax');
        },
      },
      {
        field: 'apy',
        validate: (val) => {
          const n = val as number;
          if (!n || n <= 0) return t('validation.required');
          if (n > 100) return t('validation.apyMax');
        },
      },
      {
        field: 'periodCount',
        validate: (val) => {
          const n = val as number;
          if (!n || n <= 0) return t('validation.required');
          if (n > MAX_PERIOD_COUNT) return t('validation.periodCountMax');
        },
      },
      {
        field: 'taxValue',
        validate: (val, values) => {
          const n = val as number;
          if (n < 0) return t('validation.taxValueMin');
          if (
            (values as CapitalFormValues).taxMode === 'percentage' &&
            n >= 100
          )
            return t('validation.taxPercentageMax');
        },
      },
    ]
  );

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

    const values: CapitalFormValues = {
      targetReturn: targetReturn.numericValue,
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
        label={t('targetReturn.label')}
        placeholder={t('targetReturn.placeholder')}
        suffix={t('targetReturn.suffix')}
        value={targetReturn.value}
        onChange={(e) => {
          targetReturn.onChange(e);
          clearError('targetReturn');
        }}
        inputMode="decimal"
        errorText={errors.targetReturn}
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
