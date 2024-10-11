/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'frabjous-mandazi-ce974e.netlify.app',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
