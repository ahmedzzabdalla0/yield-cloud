'use client';

import { cn } from 'cn';
import { AlertCircle } from 'lucide-react';
import * as React from 'react';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'border-input bg-background text-body-md text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 flex h-11 w-full min-w-0 rounded-md border px-3 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3',
        className
      )}
      {...props}
    />
  );
}

type AmountInputProps = Omit<React.ComponentProps<'input'>, 'prefix'> & {
  label?: string;
  required?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  helperText?: string;
  errorText?: string;
};

function AmountInput({
  label,
  required,
  prefix,
  suffix,
  helperText,
  errorText,
  className,
  id,
  ...props
}: AmountInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const invalid = Boolean(errorText);

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={inputId} className="text-body-sm text-foreground">
            {label}
          </label>
          {required && (
            <span className="bg-muted text-caption-xs text-muted-foreground rounded-full px-2 py-0.5">
              مطلوب
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'border-input bg-background focus-within:border-ring focus-within:ring-ring/50 flex h-11 items-center overflow-hidden rounded-md border shadow-xs transition-colors focus-within:ring-3',
          invalid &&
            'border-destructive focus-within:border-destructive focus-within:ring-destructive/20 focus-within:ring-3'
        )}
      >
        {prefix && (
          <span className="border-border bg-muted text-body-sm text-muted-foreground flex h-full shrink-0 items-center border-e px-3">
            {prefix}
          </span>
        )}
        <Input
          id={inputId}
          aria-invalid={invalid}
          className="h-full flex-1 border-none bg-transparent text-end shadow-none focus-visible:ring-0"
          {...props}
        />
        {suffix && (
          <span className="text-body-sm text-muted-foreground flex h-full shrink-0 items-center px-3">
            {suffix}
          </span>
        )}
      </div>
      {errorText ? (
        <p className="text-body-sm text-destructive flex items-center gap-1">
          <AlertCircle className="size-3.5" />
          {errorText}
        </p>
      ) : helperText ? (
        <p className="text-body-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { Input, AmountInput };
