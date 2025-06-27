/** @type {import('next').NextConfig} */
const nextConfig = {
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
