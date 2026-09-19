'use client';

import { CalculatorTabs } from '@/components/common/calculator-tabs';

export function CalculatorsMobileBar() {
  return (
    <div className="border-border/60 bg-background/90 border-b px-4 py-2 backdrop-blur-sm lg:hidden">
      <CalculatorTabs />
    </div>
  );
}
