'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import {
  YIELD_CALC_PARAM_KEY,
  calcYield,
  decodeYieldFormValues,
  encodeYieldFormValues,
} from './lib';
import type { YieldFormValues, YieldResult } from './types';
import { YieldCalculatorForm } from './yield-calculator-form';
import { YieldCalculatorResult } from './yield-calculator-result';

export function YieldCalculatorClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formKey, setFormKey] = React.useState(0);
  const [defaultValues, setDefaultValues] = React.useState<
    YieldFormValues | undefined
  >(() => {
    const encoded = searchParams.get(YIELD_CALC_PARAM_KEY);
    if (encoded) return decodeYieldFormValues(encoded) ?? undefined;
    return undefined;
  });

  const [result, setResult] = React.useState<YieldResult>(() =>
    defaultValues ? calcYield(defaultValues) : null
  );

  function handleSubmit(values: YieldFormValues) {
    setResult(calcYield(values));
    const params = new URLSearchParams(searchParams.toString());
    params.set(YIELD_CALC_PARAM_KEY, encodeYieldFormValues(values));
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function handleReset() {
    setResult(null);
    setDefaultValues(undefined);
    setFormKey((k) => k + 1);
    const params = new URLSearchParams(searchParams.toString());
    params.delete(YIELD_CALC_PARAM_KEY);
    const query = params.toString();
    router.replace(query ? `?${query}` : window.location.pathname, {
      scroll: false,
    });
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
      <div className="order-2 lg:max-w-130">
        <YieldCalculatorResult result={result} onReset={handleReset} />
      </div>
      <div className="order-1">
        <YieldCalculatorForm
          key={formKey}
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
        />
      </div>
    </div>
  );
}
