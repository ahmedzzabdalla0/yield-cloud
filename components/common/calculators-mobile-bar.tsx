import { CalculatorTabs } from '@/components/common/calculator-tabs';

export function CalculatorsMobileBar() {
  return (
    <div className="[&>div:first-child]:max-w-app border-border/60 bg-background/90 flex justify-center border-b px-4 py-2 backdrop-blur-sm lg:hidden [&>div:first-child]:flex-1">
      <CalculatorTabs />
    </div>
  );
}
