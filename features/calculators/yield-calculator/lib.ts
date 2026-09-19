import type { YieldFormValues, YieldResult } from './types';

export function calcYield(values: YieldFormValues): YieldResult {
  const { monthlyIncome, apy, period, periodCount, taxMode, taxValue } = values;

  const grossMonthly = monthlyIncome;

  const taxDeduction =
    taxMode === 'percentage' ? grossMonthly * (taxValue / 100) : taxValue;

  const netMonthly = Math.max(0, grossMonthly + taxDeduction);

  const netApy = apy / 100;

  const principal = netApy > 0 ? (netMonthly * 12) / netApy : 0;

  const grossPerYear = principal * netApy;
  const grossPerMonth = grossPerYear / 12;
  const grossPerDay = grossPerYear / 365;

  const countMultiplier = Math.max(1, periodCount);

  const periodUnitReturn: Record<string, number> = {
    day: grossPerDay,
    month: grossPerMonth,
    year: grossPerYear,
  };

  return {
    principal,
    perDay: grossPerDay,
    perMonth: grossPerMonth,
    perYear: grossPerYear,
    selectedPeriodReturn: periodUnitReturn[period] * countMultiplier,
    selectedPeriod: period,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function toIntlLocale(_locale: string): string {
  return 'en-US';
}

export function formatCurrency(value: number, locale: string): string {
  return new Intl.NumberFormat(toIntlLocale(locale), {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}
