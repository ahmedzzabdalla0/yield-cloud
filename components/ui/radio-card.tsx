'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';
import { cn } from '@/lib/utils';

function RadioCardGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-card-group"
      className={cn('grid grid-cols-1 gap-3 sm:grid-cols-2', className)}
      {...props}
    />
  );
}

type RadioCardProps = React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  label: string;
  description?: string;
};

function RadioCard({
  className,
  label,
  description,
  id,
  ...props
}: RadioCardProps) {
  const generatedId = React.useId();
  const itemId = id ?? generatedId;

  return (
    <label
      htmlFor={itemId}
      className={cn(
        'border-border bg-background hover:bg-muted has-data-[state=checked]:border-primary has-data-[state=checked]:bg-brand-50 flex cursor-pointer items-center justify-between gap-3 rounded-md border p-3.5 transition-colors',
        className
      )}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-body-md text-foreground">{label}</span>
        {description && (
          <span className="text-body-sm text-muted-foreground">
            {description}
          </span>
        )}
      </div>
      <RadioGroupPrimitive.Item
        id={itemId}
        data-slot="radio-card-indicator"
        className="border-input data-[state=checked]:border-primary data-[state=checked]:bg-primary flex size-4 shrink-0 items-center justify-center rounded-full border outline-none"
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="bg-primary-foreground size-1.5 rounded-full" />
      </RadioGroupPrimitive.Item>
    </label>
  );
}

export { RadioCardGroup, RadioCard };
