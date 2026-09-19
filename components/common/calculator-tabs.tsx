'use client';

import { CircleDollarSign, Target, Wallet } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type CalculatorTabsProps = {
  activeTab: string;
  onTabChange: (value: string) => void;
  className?: string;
};

const TABS = [
  {
    value: 'yield-calculator',
    icon: Wallet,
    label: 'yieldCalculator',
    labelShort: 'yieldCalculatorShort',
  },
  {
    value: 'capital-calculator',
    icon: CircleDollarSign,
    label: 'capitalCalculator',
    labelShort: 'capitalCalculatorShort',
  },
  {
    value: 'goal-calculator',
    icon: Target,
    label: 'goalCalculator',
    labelShort: 'goalCalculatorShort',
  },
] as const;

export function CalculatorTabs({
  activeTab,
  onTabChange,
  className,
}: CalculatorTabsProps) {
  const t = useTranslations('nav');

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className={className}>
      {/* mobile — no icons, short labels */}
      <TabsList className="w-full sm:hidden">
        {TABS.map(({ value, labelShort }) => (
          <TabsTrigger key={value} value={value} hideIcon>
            {t(labelShort)}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* desktop — with icons, full labels */}
      <TabsList className="hidden w-auto sm:inline-grid">
        {TABS.map(({ value, icon: Icon, label }) => (
          <TabsTrigger key={value} value={value}>
            <Icon />
            {t(label)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
