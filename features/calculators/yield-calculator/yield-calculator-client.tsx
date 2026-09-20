'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useCalculatorUrlState } from '@/hooks/use-calculator-url-state';
import { CalculatorClientShell } from '@/features/calculators/shared/calculator-client-shell';
import {
  YIELD_CALC_PARAM_KEY,
  calcYield,
  decodeYieldFormValues,
  encodeYieldFormValues,
} from './lib';
import type { YieldFormValues, YieldResult } from './types';
import { YieldCalculatorForm } from './yield-calculator-form';
import { YieldCalculatorResult } from './yield-calculator-result';

function YieldSearchParamsReader({
  onValues,
}: {
  onValues: (values: YieldFormValues) => void;
}) {
  const searchParams = useSearchParams();
  const encoded = searchParams.get(YIELD_CALC_PARAM_KEY);
  const called = React.useRef(false);

  React.useEffect(() => {
    if (called.current || !encoded) return;
    const values = decodeYieldFormValues(encoded);
    if (values) {
      called.current = true;
      onValues(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export function YieldCalculatorClient() {
  const { pushState, clearState } = useCalculatorUrlState<YieldFormValues>({
    paramKey: YIELD_CALC_PARAM_KEY,
    encode: encodeYieldFormValues,
  });

  const [formKey, setFormKey] = React.useState(0);
  const [defaultValues, setDefaultValues] = React.useState<
    YieldFormValues | undefined
  >(undefined);
  const [result, setResult] = React.useState<YieldResult>(null);

  function handleUrlValues(values: YieldFormValues) {
    setDefaultValues(values);
    setResult(calcYield(values));
    setFormKey((k) => k + 1);
  }

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
    <>
      <React.Suspense>
        <YieldSearchParamsReader onValues={handleUrlValues} />
      </React.Suspense>
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
    </>
  );
}
