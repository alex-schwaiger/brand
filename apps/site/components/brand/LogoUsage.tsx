import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// next build und next dev laufen in apps/site; das Paket liegt im Workspace daneben
const assets = join(process.cwd(), '../../packages/brand/assets')

function dataUri(asset: string) {
  const svg = readFileSync(join(assets, asset))
  return `data:image/svg+xml;base64,${svg.toString('base64')}`
}

const variants = [
  {
    name: 'Dunkelblau',
    asset: 'logo-darkblue.svg',
    backgrounds: ['canvas', 'subtle', 'sand'],
  },
  {
    name: 'Negativ',
    asset: 'logo-white.svg',
    backgrounds: ['ink'],
  },
]

export function LogoUsage() {
  return (
    <div className='not-prose space-y-10'>
      {variants.map(({ name, asset, backgrounds }) => (
        <section key={asset}>
          <h3 className='mb-4 font-mono text-xs uppercase tracking-label text-fd-muted-foreground'>
            {name} · {asset}
          </h3>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
            {backgrounds.map((bg) => (
              <figure key={bg} className='border border-fd-border'>
                <div
                  className='flex h-48 items-center justify-center'
                  style={{ backgroundColor: `var(--color-${bg})` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={dataUri(asset)} alt='Alexander Schwaiger' className='h-28 w-auto' />
                </div>
                <figcaption className='border-t border-fd-border p-3 font-mono text-sm'>
                  auf {bg} · --color-{bg}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
