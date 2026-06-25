import type { NextConfig } from "next";

const isNetlify = process.env.NETLIFY === 'true';

const nextConfig: NextConfig = {
  // Disable static export on Netlify to build a dynamic serverless site
  output: isNetlify ? undefined : 'export',
  // Netlify deploys to the root domain, whereas GitHub Pages/Local uses '/vsst'
  basePath: isNetlify ? '' : '/vsst',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
