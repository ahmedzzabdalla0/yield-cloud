'use client';

import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from 'cn';
import * as React from 'react';

const resultCardVariants = cva('flex flex-col gap-4 rounded-2xl border p-5', {
  variants: {
    variant: {
      default: 'border-border bg-card text-card-foreground',
      brand:
        'border-transparent bg-primary text-primary-foreground shadow-emerald',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type ResultCardVariant = NonNullable<
  VariantProps<typeof resultCardVariants>['variant']
>;

const ResultCardContext = React.createContext<{ variant: ResultCardVariant }>({
  variant: 'default',
});

function useResultCardVariant() {
  return React.useContext(ResultCardContext).variant;
}

function ResultCard({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof resultCardVariants>) {
  const resolved = variant ?? 'default';
  return (
    <ResultCardContext.Provider value={{ variant: resolved }}>
      <div
        data-slot="result-card"
        data-variant={resolved}
        className={cn(resultCardVariants({ variant: resolved, className }))}
        {...props}
      />
    </ResultCardContext.Provider>
  );
}

function ResultCardHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="result-card-header"
      className={cn(
        'flex flex-wrap items-center justify-between gap-2',
        className
      )}
      {...props}
    />
  );
}

function ResultCardEyebrow({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  const variant = useResultCardVariant();
  return (
    <span
      data-slot="result-card-eyebrow"
      className={cn(
        'text-body-sm',
        variant === 'brand'
          ? 'text-primary-foreground/70'
          : 'text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

type ResultCardValueProps = React.ComponentProps<'div'> & {
  label: string;
  value: string;
  unit?: string;
  hint?: string;
};

function ResultCardValue({
  className,
  label,
  value,
  unit,
  hint,
  ...props
}: ResultCardValueProps) {
  const variant = useResultCardVariant();
  const muted =
    variant === 'brand'
      ? 'text-primary-foreground/70'
      : 'text-muted-foreground';

  return (
    <div
      data-slot="result-card-value"
      className={cn('flex flex-col gap-1', className)}
      {...props}
    >
      <span className={cn('text-body-sm', muted)}>{label}</span>
      <div className="flex flex-wrap items-baseline gap-1.5">
        <span className="text-display-xl">{value}</span>
        {unit && <span className={cn('text-body-md', muted)}>{unit}</span>}
      </div>
      {hint && <p className={cn('text-body-sm', muted)}>{hint}</p>}
    </div>
  );
}

type ResultCardProgressProps = React.ComponentProps<'div'> & {
  value: number;
  max?: number;
  startLabel?: React.ReactNode;
  endLabel?: React.ReactNode;
};

function ResultCardProgress({
  className,
  value,
  max = 100,
  startLabel,
  endLabel,
  ...props
}: ResultCardProgressProps) {
  const variant = useResultCardVariant();
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      data-slot="result-card-progress"
      className={cn('flex flex-col gap-1.5', className)}
      {...props}
    >
      <div
        className={cn(
          'h-1.5 w-full overflow-hidden rounded-full',
          variant === 'brand' ? 'bg-primary-foreground/20' : 'bg-muted'
        )}
      >
        <div
          className={cn(
            'h-full rounded-full',
            variant === 'brand' ? 'bg-primary-foreground' : 'bg-primary'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      {(startLabel || endLabel) && (
        <div
          className={cn(
            'text-body-sm flex items-center justify-between',
            variant === 'brand'
              ? 'text-primary-foreground/70'
              : 'text-muted-foreground'
          )}
        >
          <span>{startLabel}</span>
          <span>{endLabel}</span>
        </div>
      )}
    </div>
  );
}

function ResultCardStats({ className, ...props }: React.ComponentProps<'div'>) {
  const variant = useResultCardVariant();
  return (
    <div
      data-slot="result-card-stats"
      className={cn(
        'grid grid-cols-2 gap-3 border-t pt-4 sm:grid-cols-3',
        variant === 'brand' ? 'border-primary-foreground/15' : 'border-border',
        className
      )}
      {...props}
    />
  );
}

type ResultCardStatProps = React.ComponentProps<'div'> & {
  label: string;
  value: string;
  sublabel?: string;
  tone?: 'default' | 'success';
};

function ResultCardStat({
  className,
  label,
  value,
  sublabel,
  tone = 'default',
  ...props
}: ResultCardStatProps) {
  const variant = useResultCardVariant();
  const muted =
    variant === 'brand'
      ? 'text-primary-foreground/70'
      : 'text-muted-foreground';

  return (
    <div
      data-slot="result-card-stat"
      className={cn('flex flex-col gap-0.5', className)}
      {...props}
    >
      <span className={cn('text-body-sm', muted)}>{label}</span>
      <span
        className={cn(
          'text-heading-sm',
          tone === 'success' &&
            (variant === 'brand' ? 'text-primary-foreground' : 'text-success')
        )}
      >
        {value}
      </span>
      {sublabel && (
        <span className={cn('text-body-sm', muted)}>{sublabel}</span>
      )}
    </div>
  );
}

function ResultCardFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const variant = useResultCardVariant();
  return (
    <div
      data-slot="result-card-footer"
      className={cn(
        'flex items-center justify-between gap-2 border-t pt-4',
        variant === 'brand' ? 'border-primary-foreground/15' : 'border-border',
        className
      )}
      {...props}
    />
  );
}

export {
  ResultCard,
  ResultCardHeader,
  ResultCardEyebrow,
  ResultCardValue,
  ResultCardProgress,
  ResultCardStats,
  ResultCardStat,
  ResultCardFooter,
  resultCardVariants,
};
