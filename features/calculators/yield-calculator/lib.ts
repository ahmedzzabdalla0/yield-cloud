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
      typeof parsed.principal !== 'number' ||
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

export function calcYield(values: YieldFormValues): NonNullable<YieldResult> {
  const { principal, apy, period, periodCount, taxMode, taxValue } = values;

  const dailyRate = apy / 100 / 12 / 30;

  const periodDays: Record<Period, number> = {
    day: periodCount,
    month: periodCount * 30,
    year: periodCount * 365,
  };

  const days = periodDays[period];

  const grossReturn = principal * dailyRate * days;

  const taxDeduction =
    taxMode === 'percentage'
      ? grossReturn * (taxValue / 100)
      : Math.min(taxValue, grossReturn);

  const netReturn = Math.max(0, grossReturn - taxDeduction);

  const gainPercent = principal > 0 ? (netReturn / principal) * 100 : 0;

  const perDay = principal * dailyRate;
  const perMonth = perDay * 30;
  const perYear = perDay * 365;

  return {
    grossReturn,
    taxDeduction,
    netReturn,
    gainPercent,
    perDay,
    perMonth,
    perYear,
    selectedPeriod: period,
    periodCount,
  };
}

function toIntlLocale(_locale: string): string {
  return 'en-US';
}

export function formatCurrency(value: number, locale: string): string {
  return new Intl.NumberFormat(toIntlLocale(locale), {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatPeriod(
  count: number,
  period: Period,
  locale: string,
  preposition = false
): string {
  if (locale === 'ar') {
    const forms: Record<Period, [string, string, string]> = {
      day: ['يوم', 'يومين', 'أيام'],
      month: ['شهر', 'شهرين', 'أشهر'],
      year: ['سنة', 'سنتين', 'سنوات'],
    };
    const [one, two, many] = forms[period];
    let formatted: string;
    if (count === 0 || count === 1) formatted = `${count} ${one}`;
    else if (count === 2) formatted = two;
    else if (count <= 10) formatted = `${count} ${many}`;
    else formatted = `${count} ${one}`;
    return preposition ? `في ${formatted}` : formatted;
  }

  const singular: Record<Period, string> = {
    day: 'day',
    month: 'month',
    year: 'year',
  };
  const plural: Record<Period, string> = {
    day: 'days',
    month: 'months',
    year: 'years',
  };
  const formatted = `${count} ${count === 1 ? singular[period] : plural[period]}`;
  return preposition ? `for ${formatted}` : formatted;
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
