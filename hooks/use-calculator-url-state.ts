'use client';

import { useRouter } from 'next/navigation';

type Options<TValues> = {
  paramKey: string;
  encode: (values: TValues) => string;
};

type CalculatorUrlState<TValues> = {
  pushState: (values: TValues) => void;
  clearState: () => void;
};

export function useCalculatorUrlState<TValues>({
  paramKey,
  encode,
}: Options<TValues>): CalculatorUrlState<TValues> {
  const router = useRouter();

  function pushState(values: TValues) {
    const params = new URLSearchParams(window.location.search);
    params.set(paramKey, encode(values));
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function clearState() {
    const params = new URLSearchParams(window.location.search);
    params.delete(paramKey);
    const query = params.toString();
    router.replace(query ? `?${query}` : window.location.pathname, {
      scroll: false,
    });
  }

  return { pushState, clearState };
}
