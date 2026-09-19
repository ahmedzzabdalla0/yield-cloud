import type { TaxMode } from '@/lib/calculator-types';
import type { Period } from '@/lib/formatters';

export type { Period, TaxMode };

export type CapitalFormValues = {
  targetReturn: number;
  apy: number;
  period: Period;
  periodCount: number;
  taxMode: TaxMode;
  taxValue: number;
};

export type CapitalResult = {
  requiredPrincipal: number;
  grossReturn: number;
  netReturn: number;
  effectiveApy: number;
  perDay: number;
  perMonth: number;
  perYear: number;
  selectedPeriod: Period;
  periodCount: number;
} | null;
