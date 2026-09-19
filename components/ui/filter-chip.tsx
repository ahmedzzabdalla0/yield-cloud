'use client';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from 'cn';
import { Check } from 'lucide-react';
import * as React from 'react';

function FilterChipGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="filter-chip-group"
      className={cn('flex flex-wrap items-center gap-2', className)}
      {...props}
    />
  );
}

function FilterChip({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="filter-chip"
      className={cn(
        'border-border bg-background text-body-sm text-foreground focus-visible:ring-ring/50 hover:bg-muted data-[state=on]:border-brand-100 data-[state=on]:bg-brand-50 data-[state=on]:text-brand-700 inline-flex h-9 items-center gap-1 rounded-full border px-3.5 transition-all outline-none focus-visible:ring-3 [&_svg]:pointer-events-none [&_svg]:hidden [&_svg]:size-3.5 [&_svg]:shrink-0 data-[state=on]:[&_svg]:inline-flex',
        className
      )}
      {...props}
    >
      <Check />
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { FilterChipGroup, FilterChip };
