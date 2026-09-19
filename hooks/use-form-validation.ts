'use client';

import * as React from 'react';

export type FieldRule<TValues> = {
  field: keyof TValues;
  validate: (
    value: TValues[keyof TValues],
    values: TValues
  ) => string | undefined;
};

export type FormErrors<TValues> = Partial<Record<keyof TValues, string>>;

type UseFormValidationReturn<TValues> = {
  errors: FormErrors<TValues>;
  validate: (values: TValues) => boolean;
  clearError: (field: keyof TValues) => void;
  clearAll: () => void;
};

export function useFormValidation<TValues extends Record<string, unknown>>(
  rules: FieldRule<TValues>[]
): UseFormValidationReturn<TValues> {
  const [errors, setErrors] = React.useState<FormErrors<TValues>>({});

  function validate(values: TValues): boolean {
    const next: FormErrors<TValues> = {};

    for (const rule of rules) {
      const message = rule.validate(values[rule.field], values);
      if (message) next[rule.field] = message;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function clearError(field: keyof TValues) {
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
