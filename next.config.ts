import type { NextConfig } from "next";

const isNetlify = process.env.NETLIFY === 'true';

const nextConfig: NextConfig = {
  // Always perform a static HTML export since this is a pure frontend project
  output: 'export',
  // Netlify deploys to the root domain, whereas GitHub Pages/Local uses '/vsst'
  basePath: isNetlify ? '' : '/vsst',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
