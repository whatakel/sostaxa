import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
