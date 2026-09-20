import { ImageResponse } from 'next/og';
import { LOGO_DATA_URL } from '@/lib/og-assets';

export const alt = 'Yield Cloud | غيمة العائد';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: '-160px',
          right: '-160px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.12)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '-120px',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.08)',
        }}
      />

      {/* Centered logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_DATA_URL}
        width={250}
        height={250}
        alt=""
        style={{ borderRadius: '40px' }}
      />
    </div>,
    { ...size }
  );
}
