import type { NextConfig } from "next";

const isNetlify = process.env.NETLIFY === 'true';
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';

const nextConfig: NextConfig = {
  // Always perform a static HTML export since this is a pure frontend project
  output: 'export',
  // Netlify and Vercel deploy to the root domain, whereas GitHub Pages/Local uses '/vsst'
  basePath: (isNetlify || isVercel) ? '' : '/vsst',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
