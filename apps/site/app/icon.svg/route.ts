import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Favicon wie im Portfolio: die dunkelblaue Wortmarke, unverändert aus dem Paket
export const dynamic = 'force-static'

export function GET() {
  const svg = readFileSync(join(process.cwd(), '../../packages/brand/assets/logo-darkblue.svg'))
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' },
  })
}
