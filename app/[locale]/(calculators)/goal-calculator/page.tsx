import type { Metadata } from 'next';
import { goalCalculatorMetadata } from '@/config/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return goalCalculatorMetadata[locale as 'ar' | 'en'];
}

export default function GoalCalculatorPage() {
  return <div />;
}
