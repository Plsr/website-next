import { withContentCollections } from "@content-collections/next";
import createMDX from '@next/mdx';

const withMDX = createMDX({})


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

export default withContentCollections(withMDX(nextConfig))
