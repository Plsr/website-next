import { withContentCollections } from '@content-collections/next'
import createMDX from '@next/mdx'

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

const withMDX = createMDX()

export default withContentCollections(withMDX(nextConfig))
