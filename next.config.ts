import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  
  images: {
    remotePatterns: [
      // This configuration allows images from ANY https domain
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;