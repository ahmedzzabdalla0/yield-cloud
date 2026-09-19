'use client';

import * as React from 'react';

type Options = {
  initial?: number;
  allowFloat?: boolean;
  locale?: string;
};

function formatThousands(integerPart: string, locale: string): string {
  const num = Number(integerPart.replace(/,/g, ''));
  if (isNaN(num)) return integerPart;
  return new Intl.NumberFormat(locale).format(num);
}

function sanitize(raw: string, allowFloat: boolean): string {
  if (allowFloat) {
    const cleaned = raw.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) return parts[0] + '.' + parts.slice(1).join('');
    return cleaned;
  }
  return raw.replace(/[^0-9]/g, '');
}

export function useNumericInput(options: Options = {}) {
  const { initial = undefined, allowFloat = false, locale = 'en-US' } = options;

  const [raw, setRaw] = React.useState(() => {
    if (initial == undefined) return '';
    return String(initial);
  });

  const value = React.useMemo(() => {
    if (!raw || raw === '.') return raw;
    const [integer, decimal] = raw.split('.');
    const formatted = formatThousands(integer, locale);
    return decimal !== undefined ? `${formatted}.${decimal}` : formatted;
  }, [raw, locale]);

  const numericValue = React.useMemo(() => {
    const cleaned = raw.replace(/,/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }, [raw]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const stripped = e.target.value.replace(/,/g, '');
    setRaw(sanitize(stripped, allowFloat));
  }

  function reset() {
    setRaw(initial === 0 ? '' : String(initial));
  }

  return { value, numericValue, onChange, reset };
}
