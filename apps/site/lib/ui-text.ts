/**
 * Beschriftungen der Oberfläche (Kopfleiste, Seitenleiste, Randspalte, Suche).
 * Inhalte der Seiten stehen im MDX unter `content/docs/`, nicht hier.
 */
export const uiText = {
  suchen: 'Suchen',
  suchePlatzhalter: 'Suchen',
  sucheOeffnen: 'Suche öffnen',
  sucheSchliessen: 'Suche schließen',
  menueOeffnen: 'Menü öffnen',
  menueSchliessen: 'Menü schließen',
  github: 'Quellcode auf GitHub',
  githubKurz: 'GitHub',
  paket: 'Paket',
  startseite: 'Marke, zur Startseite',
  navigation: 'Seiten',
  fuerAgents: 'Für Agents',
  aufDieserSeite: 'Auf dieser Seite',
  dieseSeite: 'Diese Seite',
  markdownKopieren: 'Markdown kopieren',
  kopiert: 'Kopiert',
  mdxAnsehen: '.mdx ansehen',
  keineTreffer: 'Keine Treffer',
  kopieren: 'kopieren',
  cssVariable: 'CSS-Variable',
  tailwind: 'Tailwind',
  hex: 'Hex',
  familie: 'Familie',
  laufweite: 'Laufweite',
  groesse: 'Größe',
  neuesFenster: '(öffnet in neuem Tab)',
} as const

export const githubUrl = 'https://github.com/alex-schwaiger/brand'

export const agentLinks = [
  { label: 'llms.txt', href: '/llms.txt' },
  { label: 'tokens.json', href: '/tokens.json' },
] as const
