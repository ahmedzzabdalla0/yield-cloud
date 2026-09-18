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
        'flex h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-body-md text-foreground shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
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
            <span className="rounded-full bg-muted px-2 py-0.5 text-caption-xs text-muted-foreground">
              مطلوب
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'flex h-11 items-center overflow-hidden rounded-md border border-input bg-background shadow-xs transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
          invalid &&
            'border-destructive focus-within:border-destructive focus-within:ring-3 focus-within:ring-destructive/20'
        )}
      >
        {prefix && (
          <span className="flex h-full shrink-0 items-center border-e border-border bg-muted px-3 text-body-sm text-muted-foreground">
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
          <span className="flex h-full shrink-0 items-center px-3 text-body-sm text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
      {errorText ? (
        <p className="flex items-center gap-1 text-body-sm text-destructive">
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
