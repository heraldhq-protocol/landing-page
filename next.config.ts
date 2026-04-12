import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    { source: '/docs', destination: '/docs/getting-started', permanent: false },
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ucshdejvxzanuxlxrano.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);

