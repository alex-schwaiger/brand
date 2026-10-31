import { color } from '@alex-schwaiger/brand/tokens'

/** Verwendung einer Farbrolle, gepflegt in Tina als Liste am Baustein `ColorPalette`. */
export interface RollenVerwendung {
  rolle: string
  verwendung: string
}

export interface Farbrolle {
  rolle: string
  name: string
  verwendung?: string
  hell: boolean
  werte: { variable: string; tailwind: string; hex: string }
}

/** Relative Leuchtdichte nach WCAG, um sehr helle Flächen mit einer Haarlinie abzusetzen. */
function leuchtdichte(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Alle Farbrollen in der Reihenfolge des Pakets. Die Verwendung kommt aus dem MDX;
 * Rollen, die das Paket nicht kennt, fallen weg.
 */
export function farbrollen(verwendungen: RollenVerwendung[] = []): Farbrolle[] {
  const text = new Map(verwendungen.map((v) => [v.rolle, v.verwendung]))
  return Object.entries(color).map(([rolle, wert]) => ({
    rolle,
    name: rolle.charAt(0).toUpperCase() + rolle.slice(1),
    verwendung: text.get(rolle),
    hell: leuchtdichte(wert) > 0.75,
    werte: {
      variable: `var(--color-${rolle})`,
      tailwind: `bg-${rolle}`,
      hex: wert.toUpperCase(),
    },
  }))
}

/** Liest die Verwendungen aus dem MDX-Tag, so wie Tina die Liste serialisiert. */
function verwendungenAusTag(tag: string): RollenVerwendung[] {
  const eintrag = /\{\s*rolle:\s*("(?:[^"\\]|\\.)*"),\s*verwendung:\s*("(?:[^"\\]|\\.)*")\s*\}/g
  return [...tag.matchAll(eintrag)].map(([, rolle, verwendung]) => ({
    rolle: JSON.parse(rolle),
    verwendung: JSON.parse(verwendung),
  }))
}

/** Markdown-Tabelle der Farbrollen für llms-full.txt und die .mdx-Rohansicht. */
export function farbrollenMarkdown(tag: string) {
  const rollen = farbrollen(verwendungenAusTag(tag))
  const mitVerwendung = rollen.some((r) => r.verwendung)
  const kopf = mitVerwendung
    ? '| Farbrolle | Verwendung | CSS-Variable | Tailwind | Farbwert |\n| --- | --- | --- | --- | --- |'
    : '| Farbrolle | CSS-Variable | Tailwind | Farbwert |\n| --- | --- | --- | --- |'
  const zeilen = rollen.map((r) => {
    const werte = `\`${r.werte.variable}\` | \`${r.werte.tailwind}\` | \`${r.werte.hex}\``
    return mitVerwendung
      ? `| ${r.name} | ${r.verwendung ?? ''} | ${werte} |`
      : `| ${r.name} | ${werte} |`
  })
  return [kopf, ...zeilen].join('\n')
}
