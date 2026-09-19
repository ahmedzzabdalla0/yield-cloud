'use client';

import { RefreshCw, Share2 } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Button } from '@/components/ui/button';

type StatItem = {
  label: string;
  value: string;
};

type CalculatorResultCardProps = {
  hasResult: boolean;
  onReset: () => void;
  shareToastMessage: string;
  resetLabel: string;
  shareLabel: string;
  children: React.ReactNode;
  stats: StatItem[];
  className?: string;
};

export function CalculatorResultCard({
  hasResult,
  onReset,
  shareToastMessage,
  resetLabel,
  shareLabel,
  children,
  stats,
  className,
}: CalculatorResultCardProps) {
  const { copy } = useCopyToClipboard();

  async function handleShare() {
    const success = await copy(window.location.href);
    if (success) toast.success(shareToastMessage);
  }

  return (
    <div
      className={cn(
        'bg-card flex flex-col overflow-hidden rounded-2xl border p-5',
        className
      )}
      style={{
        background:
          'linear-gradient(to bottom, color-mix(in oklch, var(--color-brand-500) 8%, transparent) 0%, var(--color-card) 30%)',
      }}
    >
      {children}

      <div className="my-9 grid grid-cols-2 sm:grid-cols-3">
        {stats.map(({ label, value }, i, arr) => (
          <div
            key={label}
            className={cn(
              'flex flex-col items-center gap-0.5 p-4',
              i === 0 &&
                'col-span-2 border-b pt-0 sm:col-span-1 sm:border-b-0 sm:pt-4',
              i < arr.length - 1 && 'sm:border-e',
              i === 1 && 'border-e'
            )}
          >
            <span className="text-body-sm text-muted-foreground">{label}</span>
            <span className="text-heading-sm font-semibold">{value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="lg"
          onClick={handleShare}
          disabled={!hasResult}
          className="h-fit flex-1 gap-1.5 py-2"
        >
          <Share2 className="size-4" />
          {shareLabel}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onReset}
          disabled={!hasResult}
          className="h-fit gap-1.5 py-2"
        >
          <RefreshCw className="size-3.5" />
          {resetLabel}
        </Button>
      </div>
    </div>
  );
}
