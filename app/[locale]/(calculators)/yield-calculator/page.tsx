import type { Metadata } from 'next';
import { yieldCalculatorMetadata } from '@/config/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return yieldCalculatorMetadata[locale as 'ar' | 'en'];
}

export default function YieldCalculatorPage() {
  return <div />;
}
