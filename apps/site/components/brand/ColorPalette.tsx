import { color } from '@alex-schwaiger/brand/tokens'

export function ColorPalette() {
  return (
    <div className='not-prose grid grid-cols-1 gap-4 sm:grid-cols-2'>
      {Object.entries(color).map(([name, value]) => (
        <div key={name} className='border border-fd-border'>
          <div
            className='h-20 border-b border-fd-border'
            style={{ backgroundColor: `var(--color-${name})` }}
          />
          <dl className='grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 p-4 text-sm'>
            <dt className='text-fd-muted-foreground'>Name</dt>
            <dd className='font-medium'>{name}</dd>
            <dt className='text-fd-muted-foreground'>Hex</dt>
            <dd className='font-mono'>{value}</dd>
            <dt className='text-fd-muted-foreground'>CSS-Variable</dt>
            <dd className='font-mono'>--color-{name}</dd>
            <dt className='text-fd-muted-foreground'>Tailwind</dt>
            <dd className='font-mono'>
              bg-{name} text-{name}
            </dd>
          </dl>
        </div>
      ))}
    </div>
  )
}
