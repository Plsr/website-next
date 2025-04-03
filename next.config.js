const { withContentlayer } = require('next-contentlayer')
const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    viewTransition: true,
  },
}

module.exports = withContentlayer(withMDX(nextConfig))
