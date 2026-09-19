import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

const PORTFOLIO_URL = 'https://ahmedabdelsalam.dev';
const CURRENT_YEAR = new Date().getFullYear();

export async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="border-border/60 bg-slate-25 mt-auto w-full border-t">
      <div className="max-w-app mx-auto flex flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2.5">
          <Image
            src="/assets/svgs/logo.svg"
            alt="غيمة العائد"
            width={28}
            height={28}
          />
          <div className="flex flex-col leading-none">
            <span className="text-heading-sm text-foreground">غيمة العائد</span>
            <span className="text-caption-xs text-muted-foreground tracking-widest">
              YIELD CLOUD
            </span>
          </div>
        </div>

        <p className="text-body-sm text-muted-foreground order-last text-center sm:order-0 sm:text-start">
          {t('copyright', { year: CURRENT_YEAR })}
        </p>

        <p className="text-body-sm text-muted-foreground text-center sm:text-start">
          {t('builtBy')}
          &nbsp; &nbsp;
          <a
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary underline underline-offset-4 transition-colors"
          >
            ahmedabdelsalam.dev
          </a>
        </p>
      </div>
    </footer>
  );
}
