// Die Schriftstufen sind noch keine Tokens (Konzept Q31); bis zum Minor-Release stehen die Werte hier
const stufen = [
  { name: 'text-5xl', size: 48, usage: 'Abschnittsüberschriften' },
  { name: 'text-3xl', size: 30, usage: 'Kartentitel, Zwischenüberschriften' },
  { name: 'text-xl', size: 20, usage: 'Einleitung, Aufzählungen' },
  { name: 'text-base', size: 15, usage: 'Fließtext, Navigationslinks' },
  { name: 'text-sm', size: 13, usage: 'Kartenbeschreibungen' },
  { name: 'text-xs', size: 11, usage: 'Labels, Zeitangaben, Metadaten' },
]

export function Schriftstufen() {
  return (
    <div className='not-prose divide-y divide-fd-border border border-fd-border'>
      {stufen.map(({ name, size, usage }) => (
        <div key={name} className='flex items-baseline justify-between gap-4 p-4'>
          <p style={{ fontSize: size }}>Alexander Schwaiger</p>
          <p className='text-right font-mono text-sm text-fd-muted-foreground'>
            {name} · {size}px · {usage}
          </p>
        </div>
      ))}
    </div>
  )
}
