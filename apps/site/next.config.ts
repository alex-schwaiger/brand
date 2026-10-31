import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: '/', destination: '/docs', permanent: false }]
  },
  async rewrites() {
    return [
      { source: '/docs/:path*.mdx', destination: '/llms.mdx/docs/:path*' },
      // Tina baut das Admin-Bundle nach public/admin/index.html
      { source: '/admin', destination: '/admin/index.html' },
    ]
  },
}

const withMDX = createMDX()

export default withMDX(nextConfig)
