import type { Metadata } from 'next';
import { shared } from '@/config/metadata/shared';

export const metadata: Metadata = {
  metadataBase: new URL(shared.baseUrl),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
