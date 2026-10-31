import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Schlankes Image: Next kopiert nur die benötigten Dateien nach .next/standalone
  output: 'standalone',
  // Monorepo: Tracing muss vom Workspace-Root ausgehen, sonst fehlen Abhängigkeiten
  outputFileTracingRoot: path.join(import.meta.dirname, '../..'),
}

export default nextConfig
