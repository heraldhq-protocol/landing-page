import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    { source: '/docs', destination: '/docs/getting-started', permanent: false },
  ],
};

const withMDX = createMDX();

export default withMDX(nextConfig);

