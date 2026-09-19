'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  calcYield,
  decodeYieldFormValues,
  encodeYieldFormValues,
  YIELD_CALC_DEFAULT_VALUES,
  YIELD_CALC_PARAM_KEY,
} from './lib';
import type { YieldFormValues, YieldResult } from './types';
import { YieldCalculatorForm } from './yield-calculator-form';
import { YieldCalculatorResult } from './yield-calculator-result';

export function YieldCalculatorClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValues = React.useMemo<YieldFormValues>(() => {
    const encoded = searchParams.get(YIELD_CALC_PARAM_KEY);
    if (encoded) {
      const decoded = decodeYieldFormValues(encoded);
      if (decoded) return decoded;
    }
    return YIELD_CALC_DEFAULT_VALUES;
  }, [searchParams]);

  const [result, setResult] = React.useState<YieldResult>(() =>
    calcYield(initialValues)
  );

  function handleSubmit(values: YieldFormValues) {
    setResult(calcYield(values));
    const params = new URLSearchParams(searchParams.toString());
    params.set(YIELD_CALC_PARAM_KEY, encodeYieldFormValues(values));
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function handleReset() {
    setResult(calcYield(YIELD_CALC_DEFAULT_VALUES));
    const params = new URLSearchParams(searchParams.toString());
    params.delete(YIELD_CALC_PARAM_KEY);
    const query = params.toString();
    router.replace(query ? `?${query}` : window.location.pathname, {
      scroll: false,
    });
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
      <div className="order-2">
        <YieldCalculatorResult result={result} onReset={handleReset} />
      </div>
      <div className="order-1">
        <YieldCalculatorForm
          onSubmit={handleSubmit}
          defaultValues={initialValues}
        />
      </div>
    </div>
  );
}
