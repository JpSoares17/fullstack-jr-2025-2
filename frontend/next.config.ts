import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações de ambiente
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Configurações de build
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Configurações de ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Configurações de imagens
  images: {
    domains: ['localhost'],
  },
  
  // Configurações de headers
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;
