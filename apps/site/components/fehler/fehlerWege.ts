import type { Weg } from '@/components/fehler/Fehlerinhalt'
import { fehlerText, githubUrl } from '@/lib/ui-text'

/**
 * Wege weiter nach einem Fehler. Sie lesen keinen Inhalt, damit sie auch erscheinen, wenn der
 * Inhalt der Grund für den Fehler ist. GitHub steht dabei, weil die Marke dort auch dann vollständig
 * liegt, wenn die Seite ausfällt.
 */
export const fehlerWege: readonly Weg[] = [
  { label: fehlerText.startseite, href: '/' },
  { label: fehlerText.aenderungen, href: '/aenderungen' },
  { label: fehlerText.quellcode, href: githubUrl, extern: true },
]
