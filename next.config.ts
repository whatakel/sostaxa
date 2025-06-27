import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Requisito para GitHub Pages funcionar com site estático
  output: 'export',
  basePath: '/sostaxa', // se estiver usando GitHub Pages nesse subdiretório
  trailingSlash: true,  // para garantir que todas as rotas tenham '/' no final (recomendado com export)

  webpack(config) {
    config.cache = {
      type: 'filesystem',
    };
    return config;
  },
};

export default nextConfig;
