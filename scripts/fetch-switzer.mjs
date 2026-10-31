// Lädt Switzer aus dem offiziellen Fontshare-Zip, prüft die Prüfsumme und legt
// die unveränderten woff2 in apps/site/public/fonts/switzer/ ab.
// Lizenz (ITF FFL 2.0): Die Dateien dürfen nicht ins Repo, siehe docs/adr/0003.
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { copyFileSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ZIP_URL = 'https://api.fontshare.com/v2/fonts/download/switzer'
// SHA-256 des Zips. Ändert Fontshare das Zip, schlägt der Build bewusst fehl.
const SHA256 = '93606d6368534159ab89c65287f6074017483b4d3885232cf9b420c6035b099d'
const TARGET = fileURLToPath(new URL('../apps/site/public/fonts/switzer/', import.meta.url))

const work = mkdtempSync(join(tmpdir(), 'switzer-'))
try {
  const res = await fetch(ZIP_URL, { redirect: 'follow' })
  if (!res.ok) throw new Error(`Download fehlgeschlagen: HTTP ${res.status}`)
  const zip = Buffer.from(await res.arrayBuffer())

  const actual = createHash('sha256').update(zip).digest('hex')
  if (actual !== SHA256) {
    throw new Error(`Prüfsumme stimmt nicht.\n  erwartet: ${SHA256}\n  erhalten: ${actual}`)
  }

  const zipPath = join(work, 'switzer.zip')
  writeFileSync(zipPath, zip)
  execFileSync('unzip', ['-q', zipPath, '-d', work])

  const fonts = join(work, 'Switzer_Complete', 'Fonts', 'WEB', 'fonts')
  const woff2 = readdirSync(fonts).filter((f) => f.endsWith('.woff2'))
  if (woff2.length === 0) throw new Error('Keine woff2 im Zip gefunden')

  mkdirSync(TARGET, { recursive: true })
  for (const f of woff2) copyFileSync(join(fonts, f), join(TARGET, f))
  copyFileSync(join(work, 'Switzer_Complete', 'License', 'FFL.txt'), join(TARGET, 'FFL.txt'))
  console.log(`Switzer: ${woff2.length} woff2 nach ${TARGET} kopiert (Prüfsumme ok)`)
} finally {
  rmSync(work, { recursive: true, force: true })
}
