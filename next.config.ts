import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/cultural-visions',
  assetPrefix: '/cultural-visions/',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
