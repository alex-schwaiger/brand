// Lädt Switzer aus dem offiziellen Fontshare-Zip (ADR 0003). Die Dateien bleiben unverändert,
// nur der Zielordner ist ignoriert, damit sie nie im Repo landen.
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ZIP_URL = 'https://api.fontshare.com/v2/fonts/download/switzer'
// SHA-256 je woff2-Datei; bei einer neuen Switzer-Version bewusst anpassen.
// Geprüft werden die Dateien, nicht das Zip: Fontshare packt das Zip neu (neue
// Zeitstempel), die Fonts darin bleiben gleich.
const SHA256 = {
  Regular: 'aefa3d21af6adb6dd53246ff86e1d8e7eaf36a8d792dd59136cced309e3c8862',
  Medium: '2ea341e35c0d0d00c13adec869b573297d25326140ca40fbe354a9bee468808e',
  Bold: '5cb009dd21317ac095104458dbca8e96b6ac41fdace80ef3b7c53833c44420c7',
}
const WEIGHTS = Object.keys(SHA256)
const target = fileURLToPath(new URL('../apps/site/public/fonts/switzer/', import.meta.url))

const work = mkdtempSync(join(tmpdir(), 'switzer-'))
try {
  const res = await fetch(ZIP_URL)
  if (!res.ok) throw new Error(`Download fehlgeschlagen: ${res.status} ${res.statusText}`)
  const zip = Buffer.from(await res.arrayBuffer())

  const zipPath = join(work, 'switzer.zip')
  writeFileSync(zipPath, zip)
  execFileSync('unzip', ['-q', zipPath, '-d', work])

  mkdirSync(target, { recursive: true })
  for (const weight of WEIGHTS) {
    const name = `Switzer-${weight}.woff2`
    const source = join(work, 'Switzer_Complete/Fonts/WEB/fonts', name)
    if (!existsSync(source)) throw new Error(`${name} fehlt im Zip`)
    const actual = createHash('sha256').update(readFileSync(source)).digest('hex')
    if (actual !== SHA256[weight]) {
      throw new Error(
        `Prüfsumme von ${name} stimmt nicht.\n  erwartet: ${SHA256[weight]}\n  erhalten: ${actual}`,
      )
    }
    copyFileSync(source, join(target, name))
  }
  console.log(`Switzer ${WEIGHTS.join(', ')} nach ${target} kopiert.`)
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
} finally {
  rmSync(work, { recursive: true, force: true })
}
