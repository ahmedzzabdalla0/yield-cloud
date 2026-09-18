import type { Metadata } from 'next';
import { aboutMetadata } from '@/config/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return aboutMetadata[locale as 'ar' | 'en'];
}

export default function AboutPage() {
  return <div />;
}
