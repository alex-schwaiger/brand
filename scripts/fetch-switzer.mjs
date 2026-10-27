// Lädt Switzer aus dem offiziellen Fontshare-Zip (ADR 0003). Die Dateien bleiben unverändert,
// nur der Zielordner ist ignoriert, damit sie nie im Repo landen.
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ZIP_URL = 'https://api.fontshare.com/v2/fonts/download/switzer'
// SHA-256 des Zips; bei einer neuen Switzer-Version bewusst anpassen
const SHA256 =
  process.env.SWITZER_SHA256 ?? 'cb2c17aaf1f7b8fc6bfd4288ed60a87f442ed202fdd613081e04673f75df87ac'
const WEIGHTS = ['Regular', 'Medium', 'Bold']
const target = fileURLToPath(new URL('../apps/site/public/fonts/switzer/', import.meta.url))

const work = mkdtempSync(join(tmpdir(), 'switzer-'))
try {
  const res = await fetch(ZIP_URL)
  if (!res.ok) throw new Error(`Download fehlgeschlagen: ${res.status} ${res.statusText}`)
  const zip = Buffer.from(await res.arrayBuffer())

  const actual = createHash('sha256').update(zip).digest('hex')
  if (actual !== SHA256) {
    throw new Error(`Prüfsumme stimmt nicht.\n  erwartet: ${SHA256}\n  erhalten: ${actual}`)
  }

  const zipPath = join(work, 'switzer.zip')
  writeFileSync(zipPath, zip)
  execFileSync('unzip', ['-q', zipPath, '-d', work])

  mkdirSync(target, { recursive: true })
  for (const weight of WEIGHTS) {
    const name = `Switzer-${weight}.woff2`
    const source = join(work, 'Switzer_Complete/Fonts/WEB/fonts', name)
    if (!existsSync(source)) throw new Error(`${name} fehlt im Zip`)
    copyFileSync(source, join(target, name))
  }
  console.log(`Switzer ${WEIGHTS.join(', ')} nach ${target} kopiert.`)
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
} finally {
  rmSync(work, { recursive: true, force: true })
}
