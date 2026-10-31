import path from 'node:path'
import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Schlankes Image: Next kopiert nur die benötigten Dateien nach .next/standalone
  output: 'standalone',
  // Monorepo: Tracing muss vom Workspace-Root ausgehen, sonst fehlen Abhängigkeiten
  outputFileTracingRoot: path.join(import.meta.dirname, '../..'),
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
