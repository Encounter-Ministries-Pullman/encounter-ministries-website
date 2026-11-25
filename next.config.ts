import type { NextConfig } from 'next';

const nextConfig = {
    output: 'standalone',
    poweredByHeader: false,
    pageExtensions: ['tsx', 'ts'],
} satisfies NextConfig;

export default nextConfig;