import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/bage';

type CalculatorPageHeaderProps = {
  badge: string;
  icon: LucideIcon;
  headline: string;
  description: string;
  className?: string;
};

export function CalculatorPageHeader({
  badge,
  icon: Icon,
  headline,
  description,
  className,
}: CalculatorPageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Badge variant="soft-brand" size="sm">
        <Icon />
        {badge}
      </Badge>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-display-xl">{headline}</h1>
        <p className="text-body-lg text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
