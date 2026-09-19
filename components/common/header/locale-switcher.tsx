'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const next = locale === 'ar' ? 'en' : 'ar';
  const label = locale === 'ar' ? 'English' : 'العربية';

  function toggle() {
    router.replace(pathname, { locale: next });
  }

  return (
    <Button
      variant="ghost"
      size="default"
      onClick={toggle}
      className={cn(
        'text-muted-foreground hover:text-foreground h-fit gap-1.5 bg-slate-100 py-1.5',
        className
      )}
    >
      <Globe className="size-3.5" />
      {label}
    </Button>
  );
}
