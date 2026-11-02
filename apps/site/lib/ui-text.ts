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

/**
 * Texte der Fehlerseiten (404, Fehler einer Seite, Fehler des Layouts). Sie stehen hier und nicht in
 * Tina, weil die Fehlerseite auch dann erscheinen muss, wenn der Inhalt selbst nicht lädt.
 */
export const fehlerText = {
  nichtGefundenMeta: 'Seite nicht gefunden',
  nichtGefundenTitel: 'Hier ist nichts.',
  nichtGefundenIntro:
    'Diese Adresse gibt es nicht (mehr). Die Suche oben oder eine der Seiten unten führt weiter.',
  fehlerMeta: 'Fehler',
  fehlerTitel: 'Hier hakt’s.',
  fehlerIntro:
    'Beim Laden ist etwas schiefgelaufen. Ein neuer Versuch hilft meistens, sonst bitte später noch einmal.',
  erneutLaden: 'Erneut laden',
  wegeWeiter: 'Wege weiter',
  startseite: 'Startseite',
  aenderungen: 'Änderungen',
  quellcode: 'Quellcode auf GitHub',
} as const

/** Seiten, auf die die 404 weiterführt; die Titel kommen aus dem Inhalt. */
export const nichtGefundenWege = ['/docs/logo', '/docs/farben', '/docs/typografie'] as const

export const githubUrl = 'https://github.com/alex-schwaiger/brand'

export const agentLinks = [
  { label: 'llms.txt', href: '/llms.txt' },
  { label: 'tokens.json', href: '/tokens.json' },
] as const
