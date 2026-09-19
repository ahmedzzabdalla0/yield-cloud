import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Yield Cloud',
    short_name: 'Yield Cloud',
    description:
      'Egyptian investment calculators — compute your yield and required capital instantly.',
    start_url: '/yield-calculator',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f8fafc',
    theme_color: '#059669',
    categories: ['finance', 'utilities'],
    lang: 'en',
    dir: 'ltr',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
