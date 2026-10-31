import { farbrollen, type RollenVerwendung } from '@/lib/farbrollen'
import { uiText } from '@/lib/ui-text'
import { Kopierwert } from './Kopierwert'

const formate = [
  { key: 'variable', label: uiText.cssVariable },
  { key: 'tailwind', label: uiText.tailwind },
  { key: 'hex', label: uiText.hex },
] as const

/**
 * Alle Farbrollen aus dem Paket als Liste: Farbfläche, Name, Verwendung und die drei
 * Werte, jeder einzeln kopierbar. Die Verwendung kommt aus dem MDX, die Werte aus dem Paket.
 */
export function ColorPalette({ rollen }: { rollen?: RollenVerwendung[] }) {
  return (
    <ul className='liste-ohne-stil border-border border-t'>
      {farbrollen(rollen).map((r) => (
        <li
          key={r.rolle}
          className='grid grid-cols-[40px_minmax(0,1fr)] gap-x-4 gap-y-3 border-border border-b py-4 lg:grid-cols-[48px_minmax(0,1fr)_auto] lg:items-center lg:gap-x-6'
        >
          <span
            aria-hidden
            className={`size-10 lg:size-12 ${r.hell ? 'border border-border' : ''}`}
            style={{ backgroundColor: `var(--color-${r.rolle})` }}
          />
          <div className='flex min-w-0 flex-col gap-1 leading-[1.4]'>
            <span className='font-medium text-[15px] text-ink'>{r.name}</span>
            {r.verwendung && <span className='text-[14px] text-muted'>{r.verwendung}</span>}
          </div>
          <div className='col-start-2 flex flex-wrap gap-x-5 gap-y-1 lg:col-start-3 lg:flex-col lg:items-end lg:gap-y-0'>
            {formate.map((f) => (
              <Kopierwert
                key={f.key}
                wert={r.werte[f.key]}
                beschreibung={`${r.name}, ${f.label}`}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}
