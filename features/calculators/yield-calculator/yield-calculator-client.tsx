'use client';

import * as React from 'react';
import { calcYield } from './lib';
import type { YieldFormValues, YieldResult } from './types';
import { YieldCalculatorForm } from './yield-calculator-form';
import { YieldCalculatorResult } from './yield-calculator-result';

const DEFAULT_VALUES: YieldFormValues = {
  monthlyIncome: 15_000,
  apy: 24,
  period: 'day',
  periodCount: 24,
  taxMode: 'amount',
  taxValue: 0,
};

export function YieldCalculatorClient() {
  const [result, setResult] = React.useState<YieldResult>(
    calcYield(DEFAULT_VALUES)
  );

  function handleSubmit(values: YieldFormValues) {
    setResult(calcYield(values));
  }

  function handleReset() {
    setResult(calcYield(DEFAULT_VALUES));
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
      <div className="order-2">
        <YieldCalculatorResult result={result} onReset={handleReset} />
      </div>
      <div className="order-1">
        <YieldCalculatorForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
