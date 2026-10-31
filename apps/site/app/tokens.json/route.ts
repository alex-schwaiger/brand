import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

export const dynamic = 'force-static'

const TOKENS_DIR = path.resolve(process.cwd(), '../../packages/brand/tokens')

// The package keeps one DTCG file per token type; the top-level groups never overlap, so merging is lossless.
export async function GET() {
  const files = (await readdir(TOKENS_DIR)).filter((file) => file.endsWith('.json')).sort()
  const parts = await Promise.all(
    files.map(async (file) => JSON.parse(await readFile(path.join(TOKENS_DIR, file), 'utf8'))),
  )
  return Response.json(Object.assign({}, ...parts))
}
