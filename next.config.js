/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["dl.airtable.com"],
    minimumCacheTTL: 6000,
  },
};

module.exports = nextConfig;
