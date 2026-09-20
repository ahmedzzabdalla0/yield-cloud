import { CalculatorTabs } from '@/components/common/calculator-tabs';
import { LocaleSwitcher } from './locale-switcher';
import { Logo } from './logo';

export function Header() {
  return (
    <header className="border-border/60 bg-slate-25 w-full border-b">
      <div className="max-w-app mx-auto flex h-16 items-center justify-between gap-3 px-4">
        <Logo />
        <CalculatorTabs className="mx-auto hidden lg:block" />
        <LocaleSwitcher />
      </div>
    </header>
  );
}
