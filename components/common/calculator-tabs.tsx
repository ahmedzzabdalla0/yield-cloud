'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { CircleDollarSign, Target, Wallet } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  {
    value: '/goal-calculator',
    icon: Target,
    label: 'goalCalculator',
    labelShort: 'goalCalculatorShort',
  },
] as const;

export function CalculatorTabs({ className }: CalculatorTabsProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <Tabs value={pathname} className={className}>
      {/* mobile — no icons, short labels */}
      <TabsList className="tablet:hidden w-full">
        {TABS.map(({ value, labelShort }) => (
          <TabsTrigger key={value} value={value} hideIcon asChild>
            <Link href={value}>{t(labelShort)}</Link>
          </TabsTrigger>
        ))}
      </TabsList>

      {/* desktop — with icons, full labels */}
      <TabsList className="tablet:inline-grid hidden w-auto">
        {TABS.map(({ value, icon: Icon, label }) => (
          <TabsTrigger key={value} value={value} asChild>
            <Link href={value}>
              <Icon />
              {t(label)}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
