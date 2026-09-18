import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  allowedDevOrigins: ['localhost', '127.0.0.1', '192.168.1.32'],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
