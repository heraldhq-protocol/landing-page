import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    { source: "/docs", destination: "/docs/quickstart", permanent: false },
    { source: "/register", destination: "https://notify.useherald.xyz/register", permanent: false },
    { source: "/app", destination: "https://app.useherald.xyz", permanent: false },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ucshdejvxzanuxlxrano.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "cryptologos.cc",
        pathname: "/logos/**",
      },
      {
        protocol: "https",
        hostname: "s2.coinmarketcap.com",
        pathname: "/static/img/coins/**",
      },
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
        pathname: "/coins/images/**",
      },
      {
        protocol: "https",
        hostname: "ucshdejvxzanuxlxrano.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "resources.cryptocompare.com",
        pathname: "/asset-management/**",
      },
      {
        protocol: "https",
        hostname: "asset.brandfetch.io",
        pathname: "/**",
      },
    ],
    // Optional: Configure image formats and sizes
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache for logos
  },

  // Security headers (recommended for Web3 apps)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Disable x-powered-by header
  poweredByHeader: false,
};

const withMDX = createMDX();

export default withMDX(nextConfig);

