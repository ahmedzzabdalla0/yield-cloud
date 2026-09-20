'use client';

import * as React from 'react';
import { useCalculatorUrlState } from '@/hooks/use-calculator-url-state';
import { CalculatorClientShell } from '@/features/calculators/shared/calculator-client-shell';
import { YIELD_CALC_PARAM_KEY, calcYield, encodeYieldFormValues } from './lib';
import type { YieldFormValues, YieldResult } from './types';
import { YieldCalculatorForm } from './yield-calculator-form';
import { YieldCalculatorResult } from './yield-calculator-result';

type YieldCalculatorClientProps = {
  initialValues?: YieldFormValues;
};

export function YieldCalculatorClient({
  initialValues,
}: YieldCalculatorClientProps) {
  const { pushState, clearState } = useCalculatorUrlState<YieldFormValues>({
    paramKey: YIELD_CALC_PARAM_KEY,
    encode: encodeYieldFormValues,
  });

  const [formKey, setFormKey] = React.useState(0);
  const [defaultValues, setDefaultValues] = React.useState<
    YieldFormValues | undefined
  >(initialValues);

  const [result, setResult] = React.useState<YieldResult>(() =>
    defaultValues ? calcYield(defaultValues) : null
  );

  function handleSubmit(values: YieldFormValues) {
    setResult(calcYield(values));
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
      result={<YieldCalculatorResult result={result} onReset={handleReset} />}
      form={
        <YieldCalculatorForm
          key={formKey}
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
        />
      }
    />
  );
}
