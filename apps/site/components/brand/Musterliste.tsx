import type { CSSProperties, ReactNode } from 'react'
import { Kopierwert } from './Kopierwert'

export interface Muster {
  key: string
  /** Schriftmuster, gesetzt im Stil der Zeile */
  muster: ReactNode
  stil: CSSProperties
  name: string
  details?: string
  werte: { label: string; wert: string }[]
}

/**
 * Liste von Schriftmustern im Aufbau der Farbrollen: links das Muster, darunter Name und
 * Details, rechts die Werte, jeder einzeln kopierbar.
 */
export function Musterliste({ zeilen }: { zeilen: Muster[] }) {
  return (
    <ul className='liste-ohne-stil border-border border-t'>
      {zeilen.map((z) => (
        <li
          key={z.key}
          className='grid gap-x-6 gap-y-3 border-border border-b py-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center'
        >
          <div className='flex min-w-0 flex-col gap-2'>
            <p className='min-w-0 text-ink leading-[1.2]' style={z.stil}>
              {z.muster}
            </p>
            <p className='flex flex-wrap items-baseline gap-x-2 leading-[1.4]'>
              <span className='font-medium text-[15px] text-ink'>{z.name}</span>
              {z.details && <span className='text-[14px] text-muted'>{z.details}</span>}
            </p>
          </div>
          <div className='flex flex-wrap gap-x-5 lg:flex-col lg:items-end'>
            {z.werte.map((w) => (
              <Kopierwert key={w.wert} wert={w.wert} beschreibung={`${z.name}, ${w.label}`} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}
