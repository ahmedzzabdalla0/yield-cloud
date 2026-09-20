import { ImageResponse } from 'next/og';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export const runtime = 'edge';
export const alt = 'Yield Cloud | غيمة العائد';
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
        justifyContent: 'space-between',
        padding: '72px 80px',
        background:
          'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
        direction: isAr ? 'rtl' : 'ltr',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative circle */}
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

      {/* Logo area */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
          }}
        >
          ☁️
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            {isAr ? 'غيمة العائد' : 'Yield Cloud'}
          </span>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.15em',
            }}
          >
            {isAr ? 'YIELD CLOUD' : 'YIELD CLOUD'}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '780px',
        }}
      >
        <h1
          style={{
            fontSize: '56px',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.15,
            margin: 0,
            letterSpacing: isAr ? '0' : '-0.03em',
          }}
        >
          {t('home.title')}
        </h1>
        <p
          style={{
            fontSize: '24px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {t('home.description')}
        </p>
      </div>
    </div>,
    { ...size }
  );
}
