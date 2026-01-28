/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // 开启React严格模式
  webpack: (config) => {
    // 解决ethers的模块兼容问题
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
}

module.exports = nextConfig
