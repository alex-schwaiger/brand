import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// next build und next dev laufen in apps/site; das Paket liegt im Workspace daneben
const assets = join(process.cwd(), '../../packages/brand/assets')

export type LogoAsset = 'logo-darkblue.svg' | 'logo-white.svg'

/** Ein Asset aus dem Paket als data-URI, damit die Seite die Datei unverändert zeigt. */
export function logoDataUri(asset: LogoAsset) {
  const svg = readFileSync(join(assets, asset))
  return `data:image/svg+xml;base64,${svg.toString('base64')}`
}

/** Version des Pakets, wie sie im Workspace liegt. */
export function paketVersion(): string {
  const pkg = JSON.parse(readFileSync(join(assets, '../package.json'), 'utf8')) as {
    version: string
  }
  return pkg.version
}
