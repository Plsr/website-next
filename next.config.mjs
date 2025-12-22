import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    viewTransition: true,
  },
  webpack: (config, { _isServer }) => {
    // Exclude test files from being bundled
    config.module.rules.push({
      test: /\.test\.(js|ts|jsx|tsx)$/,
      loader: 'ignore-loader',
    })

    return config
  },
}

const withMDX = createMDX()

export default withMDX(nextConfig)
