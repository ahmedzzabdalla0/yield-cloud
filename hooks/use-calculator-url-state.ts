'use client';

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
  function pushState(values: TValues) {
    const params = new URLSearchParams(window.location.search);
    params.set(paramKey, encode(values));
    history.replaceState(null, '', `?${params.toString()}`);
  }

  function clearState() {
    const params = new URLSearchParams(window.location.search);
    params.delete(paramKey);
    const query = params.toString();
    history.replaceState(
      null,
      '',
      query ? `?${query}` : window.location.pathname
    );
  }

  return { pushState, clearState };
}
