import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Garante que o SWC está habilitado (por padrão, ele já está)
  swcMinify: true,

  // Ativa o modo estrito do React para pegar bugs e renderizações duplicadas em dev
  reactStrictMode: true,

  // Ativa cache persistente do Webpack para builds mais rápidos
  webpack(config) {
    config.cache = {
      type: 'filesystem',
    };
    return config;
  },

  // Modo turbo: recompila páginas + componentes de forma mais rápida
  // OBS: experimental — se causar erro, pode remover
}
export default nextConfig;
