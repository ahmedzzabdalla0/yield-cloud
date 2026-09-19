'use client';

import * as React from 'react';

export type YieldFormErrors = {
  principal?: string;
  apy?: string;
  periodCount?: string;
  taxValue?: string;
};

type ValidatedFields = {
  principal: number;
  apy: number;
  periodCount: number;
  taxValue: number;
};

type Messages = {
  required: string;
  principalMin: string;
  apyMin: string;
  apyMax: string;
  periodCountMin: string;
  taxValueMin: string;
};

export function useYieldFormValidation(messages: Messages) {
  const [errors, setErrors] = React.useState<YieldFormErrors>({});

  function validate(fields: ValidatedFields): boolean {
    const next: YieldFormErrors = {};

    if (!fields.principal || fields.principal <= 0) {
      next.principal =
        fields.principal < 0 ? messages.principalMin : messages.required;
    }

    if (!fields.apy || fields.apy <= 0) {
      next.apy = fields.apy < 0 ? messages.apyMin : messages.required;
    } else if (fields.apy > 100) {
      next.apy = messages.apyMax;
    }

    if (!fields.periodCount || fields.periodCount <= 0) {
      next.periodCount =
        fields.periodCount < 0 ? messages.periodCountMin : messages.required;
    }

    if (fields.taxValue < 0) {
      next.taxValue = messages.taxValueMin;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function clearError(field: keyof YieldFormErrors) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function clearAll() {
    setErrors({});
  }

  return { errors, validate, clearError, clearAll };
}
