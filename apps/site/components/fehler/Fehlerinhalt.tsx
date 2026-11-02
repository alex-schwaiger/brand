import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import { RingArrow } from '@/components/motion/RingArrow'
import { fehlerText, uiText } from '@/lib/ui-text'

export type Weg = { label: string; href: string; extern?: boolean }

type Props = {
  titel: string
  intro: string
  /** Steht zwischen Intro und Wegen, etwa „Erneut laden“. */
  aktion?: ReactNode
  wege: readonly Weg[]
  /**
   * Verlässt die Seite mit einem vollen Seitenaufruf. `global-error` braucht das: Dort ist das
   * Root-Layout selbst ausgefallen, eine Navigation im Client landete im selben kaputten Baum.
   */
  harteLinks?: boolean
}

const wegKlasse =
  'group/link group/arrow flex items-center justify-between gap-6 border-border border-b py-5 font-display font-medium text-[20px] text-ink tracking-[-0.01em] lg:text-[22px]'

/** Verzögerung des Einblendens, als CSS-Variable für `.aufsteigen` in `global.css`. */
function verzoegert(ms: number, weg?: number): CSSProperties {
  return { '--verzoegerung': `${ms}ms`, ...(weg && { '--weg': `${weg}px` }) } as CSSProperties
}

/**
 * Inhalt der Fehlerseiten (404, `error.tsx`, `global-error.tsx`), gesetzt wie der Kopf einer
 * Doku-Seite und bewegt wie im Portfolio: Titel und Intro steigen beim Laden auf, die Aktion und
 * die Wege folgen. Bei reduzierter Bewegung steht alles sofort an seinem Platz.
 */
export function Fehlerinhalt({ titel, intro, aktion, wege, harteLinks = false }: Props) {
  return (
    <div className='px-4 lg:pr-8 lg:pl-[52px]'>
      <div className='flex max-w-[776px] flex-col gap-10 pt-8 pb-16 lg:gap-12 lg:pt-10 lg:pb-[120px]'>
        <header className='flex flex-col gap-3 lg:gap-4'>
          <h1 className='aufsteigen font-display font-medium text-[36px] text-ink leading-[1.2] tracking-[-0.02em] lg:text-[58px] lg:leading-none lg:tracking-normal'>
            {titel}
          </h1>
          <p
            className='aufsteigen max-w-[640px] text-[18px] text-muted leading-normal lg:text-[20px] lg:leading-[1.4]'
            style={verzoegert(100)}
          >
            {intro}
          </p>
        </header>

        {aktion && (
          <div className='aufsteigen' style={verzoegert(500)}>
            {aktion}
          </div>
        )}

        <nav aria-label={fehlerText.wegeWeiter} className='max-w-[640px] lg:mt-4'>
          <ul className='m-0 list-none border-border border-t p-0'>
            {wege.map((weg, i) => (
              <li key={weg.href} className='aufsteigen' style={verzoegert(600 + i * 60, 12)}>
                {weg.extern ? (
                  <a href={weg.href} target='_blank' rel='noreferrer' className={wegKlasse}>
                    {weg.label}
                    <span className='sr-only'> {uiText.neuesFenster}</span>
                    <RingArrow />
                  </a>
                ) : harteLinks ? (
                  <a href={weg.href} className={wegKlasse}>
                    {weg.label}
                    <RingArrow />
                  </a>
                ) : (
                  <Link href={weg.href} className={wegKlasse}>
                    {weg.label}
                    <RingArrow />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
