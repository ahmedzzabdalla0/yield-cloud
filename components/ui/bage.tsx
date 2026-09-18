import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from 'cn';
import * as React from 'react';

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full border font-medium [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        neutral: 'border-border bg-background text-foreground',
        outline: 'border-border bg-background text-muted-foreground',
        'outline-brand': 'border-primary bg-background text-primary',
        brand: 'border-transparent bg-primary text-primary-foreground',
        'soft-brand': 'border-brand-100 bg-brand-50 text-brand-700',
        success: 'border-transparent bg-success/10 text-success',
        warning: 'border-transparent bg-warn/10 text-warn',
        info: 'border-transparent bg-info/10 text-info',
        special: 'border-transparent bg-violet-50 text-violet-700',
      },
      size: {
        sm: "h-7 gap-1 px-2.5 text-caption-xs [&_svg:not([class*='size-'])]:size-3",
        md: "h-8 gap-1 px-3 text-body-sm [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-3.5 text-body-sm [&_svg:not([class*='size-'])]:size-3.5",
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
);

const dotColorByVariant: Record<
  NonNullable<VariantProps<typeof badgeVariants>['variant']>,
  string
> = {
  neutral: 'bg-muted-foreground',
  outline: 'bg-muted-foreground',
  'outline-brand': 'bg-primary',
  brand: 'bg-primary-foreground',
  'soft-brand': 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warn',
  info: 'bg-info',
  special: 'bg-violet-500',
};

type BadgeProps = Omit<React.ComponentProps<'span'>, 'children'> &
  VariantProps<typeof badgeVariants> & {
    icon?: React.ReactNode;
    dot?: boolean;
    children?: React.ReactNode;
  };

function Badge({
  className,
  variant = 'neutral',
  size,
  icon,
  dot,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'size-1.5 shrink-0 rounded-full',
            dotColorByVariant[variant ?? 'neutral']
          )}
        />
      )}
      {icon}
      {children && <span className="truncate">{children}</span>}
    </span>
  );
}

function BadgeGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="badge-group"
      className={cn('flex flex-wrap items-center gap-2', className)}
      {...props}
    />
  );
}

export { Badge, BadgeGroup, badgeVariants };
