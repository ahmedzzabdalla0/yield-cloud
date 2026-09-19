'use client';

import { SlidersHorizontal } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type CalculatorFormCardProps = {
  sectionLabel: string;
  submitLabel: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  className?: string;
};

export function CalculatorFormCard({
  sectionLabel,
  submitLabel,
  onSubmit,
  children,
  className,
}: CalculatorFormCardProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        'bg-card flex flex-col gap-5 rounded-2xl border p-5',
        className
      )}
    >
      <div className="flex items-center gap-2 border-b pb-2 lg:pb-3">
        <SlidersHorizontal className="text-primary size-4 shrink-0" />
        <span className="text-body-lg font-semibold">{sectionLabel}</span>
      </div>

      {children}

      <Button type="submit" size="lg" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}
