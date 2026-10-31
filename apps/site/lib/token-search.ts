import { color, font, radius, tracking } from '@alex-schwaiger/brand/tokens'

export interface TokenTreffer {
  /** CSS-Variable, etwa `--color-ink` */
  name: string
  value: string
  /** Farbrolle für das Farbfeld, nur bei Farb-Tokens */
  farbrolle?: string
  url: string
  /** Deutsche Suchbegriffe der Token-Art, etwa „farbe“ */
  begriffe: string
}

const alleTokens: TokenTreffer[] = [
  ...Object.entries(color).map(([rolle, value]) => ({
    name: `--color-${rolle}`,
    value: value.toUpperCase(),
    farbrolle: rolle,
    url: '/docs/farben#farbwerte',
    begriffe: 'farbe farbrolle farbwert',
  })),
  ...Object.entries(font).map(([name, value]) => ({
    name: `--font-${name}`,
    value,
    url: '/docs/typografie',
    begriffe: 'schrift schriftfamilie',
  })),
  ...Object.entries(tracking).map(([name, value]) => ({
    name: `--tracking-${name}`,
    value,
    url: '/docs/typografie',
    begriffe: 'laufweite',
  })),
  ...Object.entries(radius).map(([name, value]) => ({
    name: name === 'DEFAULT' ? '--radius' : `--radius-${name}`,
    value,
    url: '/docs/abstaende-und-form#radius',
    begriffe: 'radius ecke',
  })),
]

/** Tokens aus dem Paket, deren Name, Wert oder Token-Art die Suche enthält. */
export function sucheTokens(query: string, limit = 3): TokenTreffer[] {
  const q = query.trim().toLowerCase().replace(/^-+/, '')
  if (!q) return []
  return alleTokens
    .filter(
      (token) =>
        token.name.slice(2).includes(q) ||
        token.value.toLowerCase().includes(q) ||
        token.begriffe.split(' ').some((begriff) => begriff.startsWith(q)),
    )
    .slice(0, limit)
}
