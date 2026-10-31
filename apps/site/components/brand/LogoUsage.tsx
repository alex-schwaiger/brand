import { type LogoAsset, logoDataUri } from '@/lib/assets'

const variants: { name: string; asset: LogoAsset; background: string }[] = [
  { name: 'Dunkelblau', asset: 'logo-darkblue.svg', background: 'subtle' },
  { name: 'Negativ (weiß)', asset: 'logo-white.svg', background: 'ink' },
]

/** Beide Varianten der Wortmarke aus dem Paket, je auf einer passenden Farbrolle. */
export function LogoUsage() {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
      {variants.map(({ name, asset, background }) => (
        <figure key={asset} className='flex flex-col gap-3'>
          <div
            className='flex h-[200px] items-center justify-center lg:h-[240px]'
            style={{ backgroundColor: `var(--color-${background})` }}
          >
            {/* biome-ignore lint/performance/noImgElement: SVG aus dem Paket, keine Rasterbild-Optimierung nötig */}
            <img src={logoDataUri(asset)} alt={`Wortmarke ${name}`} className='h-[72px] w-[58px]' />
          </div>
          <figcaption className='flex items-center gap-3 leading-[1.4]'>
            <span className='font-medium text-[15px] text-ink tracking-nav'>{name}</span>
            <span className='font-mono text-[11px] text-muted'>{asset}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
