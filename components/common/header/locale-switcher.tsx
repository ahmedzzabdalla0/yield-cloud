'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from 'cn';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
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
      size="sm"
      onClick={toggle}
      className={cn(
        'text-muted-foreground hover:text-foreground gap-1.5',
        className
      )}
    >
      <Globe className="size-3.5" />
      {label}
    </Button>
  );
}
