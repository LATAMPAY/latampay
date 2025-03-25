/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "vercel.app"],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig

