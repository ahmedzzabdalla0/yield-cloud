'use client';

import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useCalculatorUrlState } from '@/hooks/use-calculator-url-state';
import { CalculatorClientShell } from '@/features/calculators/shared/calculator-client-shell';
import { CapitalCalculatorForm } from './capital-calculator-form';
import { CapitalCalculatorResult } from './capital-calculator-result';
import {
  CAPITAL_CALC_PARAM_KEY,
  calcCapital,
  decodeCapitalFormValues,
  encodeCapitalFormValues,
} from './lib';
import type { CapitalFormValues, CapitalResult } from './types';

function CapitalSearchParamsReader({
  onValues,
}: {
  onValues: (values: CapitalFormValues) => void;
}) {
  const searchParams = useSearchParams();
  const encoded = searchParams.get(CAPITAL_CALC_PARAM_KEY);
  const called = React.useRef(false);

  React.useEffect(() => {
    if (called.current || !encoded) return;
    const values = decodeCapitalFormValues(encoded);
    if (values) {
      called.current = true;
      onValues(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export function CapitalCalculatorClient() {
  const { pushState, clearState } = useCalculatorUrlState<CapitalFormValues>({
    paramKey: CAPITAL_CALC_PARAM_KEY,
    encode: encodeCapitalFormValues,
  });

  const [formKey, setFormKey] = React.useState(0);
  const [defaultValues, setDefaultValues] = React.useState<
    CapitalFormValues | undefined
  >(undefined);
  const [result, setResult] = React.useState<CapitalResult>(null);

  function handleUrlValues(values: CapitalFormValues) {
    setDefaultValues(values);
    setResult(calcCapital(values));
    setFormKey((k) => k + 1);
  }

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
    <>
      <React.Suspense>
        <CapitalSearchParamsReader onValues={handleUrlValues} />
      </React.Suspense>
      <CalculatorClientShell
        result={
          <CapitalCalculatorResult result={result} onReset={handleReset} />
        }
        form={
          <CapitalCalculatorForm
            key={formKey}
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
          />
        }
      />
    </>
  );
}
