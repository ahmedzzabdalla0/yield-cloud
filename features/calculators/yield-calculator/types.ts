export type Period = 'day' | 'month' | 'year';

export type TaxMode = 'amount' | 'percentage';

export type YieldFormValues = {
  principal: number;
  apy: number;
  period: Period;
  periodCount: number;
  taxMode: TaxMode;
  taxValue: number;
};

export type YieldResult = {
  grossReturn: number;
  taxDeduction: number;
  netReturn: number;
  gainPercent: number;
  perDay: number;
  perMonth: number;
  perYear: number;
  selectedPeriod: Period;
} | null;
