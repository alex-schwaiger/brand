import { font, tracking } from '@alex-schwaiger/brand/tokens'

const weights = [
  { name: 'Regular', value: 400 },
  { name: 'Medium', value: 500 },
  { name: 'Bold', value: 700 },
]

const sample = 'Alexander Schwaiger'

export function TypeScale() {
  return (
    <div className='not-prose space-y-10'>
      <section>
        <h3 className='mb-4 font-mono text-xs uppercase tracking-label text-fd-muted-foreground'>
          Schriftfamilien
        </h3>
        <div className='divide-y divide-fd-border border border-fd-border'>
          {Object.entries(font).map(([name, stack]) => (
            <div key={name} className='p-4'>
              <p className='text-4xl' style={{ fontFamily: `var(--font-${name})` }}>
                {sample}
              </p>
              <p className='mt-3 font-mono text-sm'>
                {name} · --font-{name} · font-{name}
              </p>
              <p className='font-mono text-sm text-fd-muted-foreground'>{stack}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className='mb-4 font-mono text-xs uppercase tracking-label text-fd-muted-foreground'>
          Gewichte
        </h3>
        <div className='divide-y divide-fd-border border border-fd-border'>
          {weights.map(({ name, value }) => (
            <div key={value} className='flex items-baseline justify-between gap-4 p-4'>
              <p className='text-2xl' style={{ fontWeight: value }}>
                {sample}
              </p>
              <p className='font-mono text-sm text-fd-muted-foreground'>
                {name} · {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className='mb-4 font-mono text-xs uppercase tracking-label text-fd-muted-foreground'>
          Laufweite
        </h3>
        <div className='divide-y divide-fd-border border border-fd-border'>
          {Object.entries(tracking).map(([name, value]) => (
            <div key={name} className='flex items-baseline justify-between gap-4 p-4'>
              <p className='text-2xl' style={{ letterSpacing: `var(--tracking-${name})` }}>
                {sample}
              </p>
              <p className='font-mono text-sm text-fd-muted-foreground'>
                {name} · {value} · --tracking-{name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
