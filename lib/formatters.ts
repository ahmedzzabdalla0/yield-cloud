export type FormatLocale = string;

function toIntlLocale(_locale: FormatLocale): string {
  return 'en-US';
}

export function formatCurrency(value: number, locale: FormatLocale): string {
  const abs = Math.abs(value);
  const intl = toIntlLocale(locale);

  if (abs >= 1_000_000_000) {
    return new Intl.NumberFormat(intl, {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 2,
    }).format(value);
  }

  if (abs >= 1_000_000) {
    return new Intl.NumberFormat(intl, {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(value);
  }

  return new Intl.NumberFormat(intl, {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export type Period = 'day' | 'month' | 'year';

export function formatPeriod(
  count: number,
  period: Period,
  locale: FormatLocale,
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
