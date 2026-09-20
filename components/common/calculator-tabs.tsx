'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { CircleDollarSign, Wallet } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

type CalculatorTabsProps = {
  className?: string;
};

const TABS = [
  {
    value: '/yield-calculator',
    icon: Wallet,
    label: 'yieldCalculator',
    labelShort: 'yieldCalculatorShort',
  },
  {
    value: '/capital-calculator',
    icon: CircleDollarSign,
    label: 'capitalCalculator',
    labelShort: 'capitalCalculatorShort',
  },
] as const;

const listClassName =
  'inline-grid h-fit auto-cols-[1fr] grid-flow-col items-center gap-x-1.5 rounded-xl bg-slate-100 p-1.5';

function tabLinkClassName(active: boolean) {
  return cn(
    'group relative inline-flex shrink-0 basis-0 items-center justify-center gap-1.5',
    'rounded-lg px-3 py-1 sm:px-5 sm:py-2',
    'text-body-lg lg:text-body-md font-medium whitespace-nowrap',
    'transition-colors duration-200',
    'focus-visible:ring-ring/50 outline-none focus-visible:ring-3',
    active
      ? 'bg-brand-800 text-white shadow-md'
      : 'text-muted-foreground hover:bg-brand-700/15 hover:text-foreground'
  );
}

export function CalculatorTabs({ className }: CalculatorTabsProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <nav className={cn('flex flex-col gap-2', className)}>
      <div className={cn(listClassName, 'tablet:hidden w-full')} dir="auto">
        {TABS.map(({ value, labelShort }) => {
          const active = pathname === value;
          return (
            <Link
              key={value}
              href={value}
              aria-current={active ? 'page' : undefined}
              className={tabLinkClassName(active)}
            >
              {t(labelShort)}
            </Link>
          );
        })}
      </div>

      <div
        className={cn(listClassName, 'tablet:inline-grid hidden w-auto')}
        dir="auto"
      >
        {TABS.map(({ value, icon: Icon, label }) => {
          const active = pathname === value;
          return (
            <Link
              key={value}
              href={value}
              aria-current={active ? 'page' : undefined}
              className={tabLinkClassName(active)}
            >
              {active && <Icon className="size-4" />}
              {t(label)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
