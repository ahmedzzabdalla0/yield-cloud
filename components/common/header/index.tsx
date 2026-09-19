'use client';

import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { CalculatorTabs } from '@/components/common/calculator-tabs';
import { LocaleSwitcher } from './locale-switcher';
import { Logo } from './logo';

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <header className="border-border/60 bg-slate-25 w-full border-b">
      <div className="max-w-app mx-auto flex h-16 items-center justify-between gap-3 px-4">
        <Logo />

        <CalculatorTabs className="mx-auto hidden lg:block" />

        <div className="flex shrink-0 items-center gap-1">
          {pathname !== '/about' && (
            <Button
              variant="ghost"
              size="default"
              asChild
              className="text-muted-foreground hover:text-foreground bg-brand-50/70 border-brand-100 h-fit border py-1.5"
            >
              <Link href="/about">{t('about')}</Link>
            </Button>
          )}
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
