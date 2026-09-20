import Link from 'next/link';
import type { Metadata } from 'next';
import { shared } from '@/config/metadata/shared';

export const metadata: Metadata = {
  metadataBase: new URL(shared.baseUrl),
  title: 'Not Found | الصفحة غير موجودة',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <html lang="en" dir="ltr">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 20%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '5rem',
              height: '5rem',
              borderRadius: '1.5rem',
              background: '#d1fae5',
              color: '#065f46',
              fontSize: '1.75rem',
              fontWeight: 900,
            }}
          >
            404
          </div>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(1.875rem, calc(1.743rem + 0.5282vw), 2.25rem)',
                fontWeight: 900,
                lineHeight: 1.22,
                color: '#0f172a',
              }}
            >
              Page not found
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(0.9375rem, calc(0.9155rem + 0.088vw), 1rem)',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#64748b',
              }}
            >
              This page doesn&apos;t exist or has been moved.
            </p>
          </div>

          <Link
            href="/yield-calculator"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '2.75rem',
              paddingInline: '1.25rem',
              borderRadius: '0.5rem',
              background: '#022c22',
              color: '#ecfdf5',
              fontWeight: 600,
              fontSize: 'clamp(0.8125rem, calc(0.7905rem + 0.088vw), 0.875rem)',
              textDecoration: 'none',
              boxShadow: '0 4px 14px 0 rgb(16 185 129 / 0.2)',
            }}
          >
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
