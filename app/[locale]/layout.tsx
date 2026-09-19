import { Cairo } from 'next/font/google';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { layoutMetadata } from '@/config/metadata';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { CalculatorsMobileBar } from '@/components/common/calculators-mobile-bar';
import { ClarityInit } from '@/components/common/clarity';
import { Footer } from '@/components/common/footer';
import { Header } from '@/components/common/header';
import '../globals.css';

export const revalidate = 31536000;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return layoutMetadata[locale as 'ar' | 'en'];
}

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-cairo',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <html
      className={cn('h-full', 'antialiased', cairo.variable, 'font-sans')}
      lang={locale}
      dir={dir}
    >
      <body className="flex min-h-full flex-col bg-slate-50">
        <ClarityInit
          projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? ''}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <CalculatorsMobileBar />
          {children}
          <Footer />
          <Toaster position="bottom-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
