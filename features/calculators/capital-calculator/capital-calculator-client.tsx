'use client';

import * as React from 'react';
import { useCalculatorUrlState } from '@/hooks/use-calculator-url-state';
import { CalculatorClientShell } from '@/features/calculators/shared/calculator-client-shell';
import { CapitalCalculatorForm } from './capital-calculator-form';
import { CapitalCalculatorResult } from './capital-calculator-result';
import {
  CAPITAL_CALC_PARAM_KEY,
  calcCapital,
  encodeCapitalFormValues,
} from './lib';
import type { CapitalFormValues, CapitalResult } from './types';

type CapitalCalculatorClientProps = {
  initialValues?: CapitalFormValues;
};

export function CapitalCalculatorClient({
  initialValues,
}: CapitalCalculatorClientProps) {
  const { pushState, clearState } = useCalculatorUrlState<CapitalFormValues>({
    paramKey: CAPITAL_CALC_PARAM_KEY,
    encode: encodeCapitalFormValues,
  });

  const [formKey, setFormKey] = React.useState(0);
  const [defaultValues, setDefaultValues] = React.useState<
    CapitalFormValues | undefined
  >(initialValues);

  const [result, setResult] = React.useState<CapitalResult>(() =>
    defaultValues ? calcCapital(defaultValues) : null
  );

  function handleSubmit(values: CapitalFormValues) {
    setResult(calcCapital(values));
    pushState(values);
  }

  function handleReset() {
    setResult(null);
    setDefaultValues(undefined);
    setFormKey((k) => k + 1);
    clearState();
  }

  return (
    <CalculatorClientShell
      result={<CapitalCalculatorResult result={result} onReset={handleReset} />}
      form={
        <CapitalCalculatorForm
          key={formKey}
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
        />
      }
    />
  );
}
