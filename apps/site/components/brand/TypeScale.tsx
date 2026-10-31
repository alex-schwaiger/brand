import { font, tracking } from '@alex-schwaiger/brand/tokens'
import { uiText } from '@/lib/ui-text'
import { type Muster, Musterliste } from './Musterliste'

/** Erster Familienname aus dem Token, etwa `Switzer` aus `"Switzer", sans-serif`. */
function familienname(stack: string) {
  return stack.split(',')[0].replaceAll('"', '').trim()
}

const gewichte = {
  400: { name: 'Regular', klasse: 'font-normal' },
  500: { name: 'Medium', klasse: 'font-medium' },
  700: { name: 'Bold', klasse: 'font-bold' },
} as const

interface Rolle {
  key: string
  name: string
  muster: string
  familie: keyof typeof font
  gewicht: keyof typeof gewichte
  laufweite?: keyof typeof tracking
  groesse: number
  versalien?: boolean
}

// Rollen der Typografie; Familien und Laufweiten kommen aus dem Paket
const rollen: Rolle[] = [
  {
    key: 'display',
    name: 'Display',
    muster: 'Alexander Schwaiger',
    familie: 'display',
    gewicht: 500,
    laufweite: 'display',
    groesse: 40,
  },
  {
    key: 'ueberschriften',
    name: 'Überschriften',
    muster: 'Abschnitt',
    familie: 'display',
    gewicht: 700,
    laufweite: 'display',
    groesse: 28,
  },
  {
    key: 'fliesstext',
    name: 'Fließtext',
    muster: 'Kurze, ruhige Sätze mit einem Gedanken pro Satz.',
    familie: 'body',
    gewicht: 400,
    groesse: 18,
  },
  {
    key: 'labels',
    name: 'Labels',
    muster: '[ Expertise ]',
    familie: 'body',
    gewicht: 500,
    laufweite: 'label',
    groesse: 11,
    versalien: true,
  },
  {
    key: 'navigation',
    name: 'Navigation',
    muster: 'Grundlagen',
    familie: 'body',
    gewicht: 400,
    laufweite: 'nav',
    groesse: 15,
  },
  {
    key: 'code',
    name: 'Code',
    muster: '--color-ink',
    familie: 'mono',
    gewicht: 400,
    groesse: 15,
  },
]

function zeile(r: Rolle): Muster {
  const gewicht = gewichte[r.gewicht]
  const tailwind = [
    `font-${r.familie}`,
    gewicht.klasse,
    r.laufweite && `tracking-${r.laufweite}`,
    r.versalien && 'uppercase',
  ]
  const details = [
    `${familienname(font[r.familie])} ${gewicht.name} ${r.gewicht}`,
    r.laufweite && tracking[r.laufweite],
  ]
  const werte: Muster['werte'] = [
    { label: uiText.tailwind, wert: tailwind.filter(Boolean).join(' ') },
    { label: uiText.familie, wert: `var(--font-${r.familie})` },
  ]
  if (r.laufweite) werte.push({ label: uiText.laufweite, wert: `var(--tracking-${r.laufweite})` })

  return {
    key: r.key,
    name: r.name,
    muster: r.muster,
    stil: {
      fontFamily: `var(--font-${r.familie})`,
      fontWeight: r.gewicht,
      fontSize: r.groesse,
      letterSpacing: r.laufweite ? `var(--tracking-${r.laufweite})` : undefined,
      textTransform: r.versalien ? 'uppercase' : undefined,
    },
    details: details.filter(Boolean).join(' · '),
    werte,
  }
}

/** Schriftfamilien, Gewichte und Laufweiten der Marke als Schriftmuster. */
export function TypeScale() {
  return <Musterliste zeilen={rollen.map(zeile)} />
}
