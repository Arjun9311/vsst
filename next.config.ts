import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/vsst',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
