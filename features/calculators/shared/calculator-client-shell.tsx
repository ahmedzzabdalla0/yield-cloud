'use client';

import * as React from 'react';

type CalculatorClientShellProps = {
  form: React.ReactNode;
  result: React.ReactNode;
};

export function CalculatorClientShell({
  form,
  result,
}: CalculatorClientShellProps) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
      <div className="order-2 lg:max-w-130">{result}</div>
      <div className="order-1">{form}</div>
    </div>
  );
}
