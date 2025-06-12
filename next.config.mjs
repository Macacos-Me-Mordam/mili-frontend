/** @type {import('next').NextConfig} */
const nextConfig = {
  // Adicionamos a configuração de imagens aqui
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',

      },
    ];
  },
};

export default nextConfig;