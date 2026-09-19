import type { Period, TaxMode, YieldFormValues, YieldResult } from './types';

export const YIELD_CALC_PARAM_KEY = 's';

const VALID_PERIODS: Period[] = ['day', 'month', 'year'];
const VALID_TAX_MODES: TaxMode[] = ['amount', 'percentage'];

export function encodeYieldFormValues(values: YieldFormValues): string {
  return btoa(encodeURIComponent(JSON.stringify(values)));
}

export function decodeYieldFormValues(encoded: string): YieldFormValues | null {
  try {
    const parsed = JSON.parse(
      decodeURIComponent(atob(encoded))
    ) as Partial<YieldFormValues>;

    if (
      typeof parsed.monthlyIncome !== 'number' ||
      typeof parsed.apy !== 'number' ||
      typeof parsed.periodCount !== 'number' ||
      typeof parsed.taxValue !== 'number' ||
      !VALID_PERIODS.includes(parsed.period as Period) ||
      !VALID_TAX_MODES.includes(parsed.taxMode as TaxMode)
    ) {
      return null;
    }

    return parsed as YieldFormValues;
  } catch {
    return null;
  }
}

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
