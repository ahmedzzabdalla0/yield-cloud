import type { Metadata } from 'next';
import { capitalCalculatorMetadata } from '@/config/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return capitalCalculatorMetadata[locale as 'ar' | 'en'];
}

export default function CapitalCalculatorPage() {
  return <div />;
}
