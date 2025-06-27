import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Requisito para GitHub Pages funcionar com site estático
  output: 'export',
  basePath: '/sostaxa',
  trailingSlash: true,

  webpack(config) {
    config.cache = {
      type: 'filesystem',
    };
    return config;
  },
};

export default nextConfig;
