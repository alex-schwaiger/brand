import path from 'node:path'
import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Schlankes Image: Next kopiert nur die benötigten Dateien nach .next/standalone
  output: 'standalone',
  // Monorepo: Tracing muss vom Workspace-Root ausgehen, sonst fehlen Abhängigkeiten
  outputFileTracingRoot: path.join(import.meta.dirname, '../..'),
  async redirects() {
    // Die Seiten lagen früher unter /docs; alte Links und Suchergebnisse landen so am neuen Ort
    return [
      { source: '/docs', destination: '/', permanent: true },
      { source: '/docs/:path*', destination: '/:path*', permanent: true },
    ]
  },
  async rewrites() {
    return [
      // Rohansicht: /farben.mdx, die Startseite als /index.mdx
      { source: '/index.mdx', destination: '/llms.mdx' },
      { source: '/:path*.mdx', destination: '/llms.mdx/:path*' },
      // Tina baut das Admin-Bundle nach public/admin/index.html
      { source: '/admin', destination: '/admin/index.html' },
    ]
  },
}

const withMDX = createMDX()

export default withMDX(nextConfig)
