import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  allowedDevOrigins: ['localhost', '127.0.0.1', '192.168.1.32'],
  experimental: {
    inlineCss: true,
  },
};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    messages: {
      path: './messages',
      format: 'json',
      locales: 'infer',
      precompile: true,
    },
  },
});
export default withNextIntl(nextConfig);
