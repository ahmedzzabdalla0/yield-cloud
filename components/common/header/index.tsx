'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';
import { CalculatorTabs } from '@/components/common/calculator-tabs';
import { LocaleSwitcher } from './locale-switcher';
import { Logo } from './logo';

type HeaderProps = {
  activeTab: string;
  onTabChange: (value: string) => void;
};

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <header className="border-border/60 bg-background/90 sticky top-0 z-40 w-full border-b backdrop-blur-sm">
      <div className="max-w-app mx-auto flex h-16 items-center justify-between gap-3 px-4">
        <Logo />

        <CalculatorTabs
          activeTab={activeTab}
          onTabChange={onTabChange}
          className="mx-auto hidden lg:block"
        />

        <div className="flex shrink-0 items-center justify-items-end gap-1">
          <Link
            href="/about"
            className={cn(
              'text-body-sm hover:bg-muted hover:text-foreground hidden rounded-xl px-3 py-2 font-medium transition-colors duration-200 sm:inline-flex sm:items-center',
              pathname === '/about'
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
          >
            {t('about')}
          </Link>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
