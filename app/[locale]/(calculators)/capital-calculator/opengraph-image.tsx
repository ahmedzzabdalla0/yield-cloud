import { ImageResponse } from 'next/og';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { LOGO_DATA_URL } from '@/lib/og-assets';

export const runtime = 'edge';
export const alt = 'Required Capital Calculator | Yield Cloud';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function OpengraphImage({ params }: Props) {
  const { locale } = await params;
  const validLocale = routing.locales.includes(locale as 'ar' | 'en')
    ? (locale as 'ar' | 'en')
    : routing.defaultLocale;

  const t = await getTranslations({ locale: validLocale, namespace: 'og' });
  const isAr = validLocale === 'ar';

  return new ImageResponse(
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isAr ? 'flex-end' : 'flex-start',
        justifyContent: 'center',
        padding: '72px 80px',
        background:
          'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
        direction: isAr ? 'rtl' : 'ltr',
        position: 'relative',
        overflow: 'hidden',
        gap: '32px',
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-120px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.15)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.1)',
        }}
      />

      {/* Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '100px',
          padding: '8px 20px',
          width: 'fit-content',
        }}
      >
        <span style={{ fontSize: '20px' }}>🎯</span>
        <span
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#6ee7b7',
            letterSpacing: '0.02em',
          }}
        >
          {t('capitalCalculator.badge')}
        </span>
      </div>

      {/* Logo + site name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_DATA_URL}
          width={48}
          height={48}
          alt=""
          style={{ borderRadius: '12px' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.01em',
            }}
          >
            {isAr ? 'غيمة العائد' : 'Yield Cloud'}
          </span>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.12em',
            }}
          >
            YIELD CLOUD
          </span>
        </div>
      </div>

      {/* Title + description */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '800px',
        }}
      >
        <h1
          style={{
            fontSize: '54px',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.15,
            margin: 0,
            letterSpacing: isAr ? '0' : '-0.03em',
          }}
        >
          {t('capitalCalculator.title')}
        </h1>
        <p
          style={{
            fontSize: '22px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {t('capitalCalculator.description')}
        </p>
      </div>
    </div>,
    { ...size }
  );
}
