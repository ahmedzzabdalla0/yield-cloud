import { formatCurrency, formatPercent, formatPeriod } from '@/lib/formatters';
import type {
  CapitalFormValues,
  CapitalResult,
  Period,
  TaxMode,
} from './types';

export { formatCurrency, formatPercent, formatPeriod };

export const CAPITAL_CALC_PARAM_KEY = 's';

const VALID_PERIODS: Period[] = ['day', 'month', 'year'];
const VALID_TAX_MODES: TaxMode[] = ['amount', 'percentage'];

export function encodeCapitalFormValues(values: CapitalFormValues): string {
  return btoa(encodeURIComponent(JSON.stringify(values)));
}

export function decodeCapitalFormValues(
  encoded: string
): CapitalFormValues | null {
  try {
    const parsed = JSON.parse(
      decodeURIComponent(atob(encoded))
    ) as Partial<CapitalFormValues>;

    if (
      typeof parsed.targetReturn !== 'number' ||
      typeof parsed.apy !== 'number' ||
      typeof parsed.periodCount !== 'number' ||
      typeof parsed.taxValue !== 'number' ||
      !VALID_PERIODS.includes(parsed.period as Period) ||
      !VALID_TAX_MODES.includes(parsed.taxMode as TaxMode)
    ) {
      return null;
    }

    return parsed as CapitalFormValues;
  } catch {
    return null;
  }
}

export function calcCapital(
  values: CapitalFormValues
): NonNullable<CapitalResult> {
  const { targetReturn, apy, period, periodCount, taxMode, taxValue } = values;

  const dailyRate = apy / 100 / 12 / 30;

  const periodDays: Record<Period, number> = {
    day: periodCount,
    month: periodCount * 30,
    year: periodCount * 365,
  };

  const days = periodDays[period];

  const grossReturn =
    taxMode === 'percentage'
      ? taxValue >= 100
        ? targetReturn
        : targetReturn / (1 - taxValue / 100)
      : targetReturn + Math.max(0, taxValue);

  const requiredPrincipal =
    dailyRate > 0 && days > 0 ? grossReturn / (dailyRate * days) : 0;

  const netReturn = targetReturn;
  const effectiveApy =
    requiredPrincipal > 0 ? (grossReturn / requiredPrincipal) * 100 : 0;

  const perDay = requiredPrincipal * dailyRate;
  const perMonth = perDay * 30;
  const perYear = perDay * 365;

  return {
    requiredPrincipal,
    grossReturn,
    netReturn,
    effectiveApy,
    perDay,
    perMonth,
    perYear,
    selectedPeriod: period,
    periodCount,
  };
}
