'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

type Options<TValues> = {
  paramKey: string;
  encode: (values: TValues) => string;
  decode: (encoded: string) => TValues | null;
};

type CalculatorUrlState<TValues> = {
  initialValues: TValues | undefined;
  pushState: (values: TValues) => void;
  clearState: () => void;
};

export function useCalculatorUrlState<TValues>({
  paramKey,
  encode,
  decode,
}: Options<TValues>): CalculatorUrlState<TValues> {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [initialValues] = React.useState<TValues | undefined>(() => {
    const encoded = searchParams.get(paramKey);
    if (encoded) return decode(encoded) ?? undefined;
    return undefined;
  });

  function pushState(values: TValues) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramKey, encode(values));
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function clearState() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(paramKey);
    const query = params.toString();
    router.replace(query ? `?${query}` : window.location.pathname, {
      scroll: false,
    });
  }

  return { initialValues, pushState, clearState };
}
