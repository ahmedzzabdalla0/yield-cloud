import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      {/* Badge */}
      <div className="bg-brand-100 text-brand-800 flex size-20 items-center justify-center rounded-3xl text-2xl font-black">
        {t('label')}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h1 className="text-display-xl text-slate-900">{t('heading')}</h1>
        <p className="text-body-lg text-slate-500">{t('body')}</p>
      </div>

      {/* CTA */}
      <Link
        href="/yield-calculator"
        className="bg-brand-900 text-primary-foreground shadow-emerald hover:bg-brand-800 text-body-md inline-flex h-11 items-center justify-center rounded-lg px-5 font-semibold transition-colors"
      >
        {t('cta')}
      </Link>
    </div>
  );
}
