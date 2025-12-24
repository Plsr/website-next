import createMDX from '@next/mdx'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    viewTransition: true,
  },
  outputFileTracingRoot: path.join(__dirname, '../../'),
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
