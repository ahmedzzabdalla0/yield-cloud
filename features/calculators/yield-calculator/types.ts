export type Period = 'day' | 'month' | 'year';

export type TaxMode = 'amount' | 'percentage';

export type YieldFormValues = {
  monthlyIncome: number;
  apy: number;
  period: Period;
  periodCount: number;
  taxMode: TaxMode;
  taxValue: number;
};

export type YieldResult = {
  principal: number;
  perDay: number;
  perMonth: number;
  perYear: number;
  selectedPeriodReturn: number;
  selectedPeriod: Period;
} | null;
