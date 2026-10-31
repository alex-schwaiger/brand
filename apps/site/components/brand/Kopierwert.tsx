'use client'

import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/docs/Icon'
import { uiText } from '@/lib/ui-text'

/**
 * Ein Token-Wert in Mono (Farbe, Schrift, Stufe). Ein Klick kopiert ihn; das Kopier-Icon erscheint bei
 * Hover und Fokus, auf Touch-Geräten steht es immer da. Danach zwei Sekunden ein Häkchen.
 */
export function Kopierwert({ wert, beschreibung }: { wert: string; beschreibung: string }) {
  const [kopiert, setKopiert] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function kopieren() {
    await navigator.clipboard.writeText(wert)
    setKopiert(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setKopiert(false), 2000)
  }

  return (
    <button
      type='button'
      onClick={kopieren}
      aria-label={`${beschreibung} ${wert} ${uiText.kopieren}`}
      className={`group inline-flex min-h-6 w-fit items-center gap-1.5 font-mono text-[12px] leading-[1.4] hover:text-ink focus-visible:text-ink ${
        kopiert ? 'text-ink' : 'text-muted'
      }`}
    >
      {wert}
      <Icon
        name={kopiert ? 'check' : 'copy'}
        size={12}
        className={
          kopiert
            ? ''
            : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100'
        }
      />
      <span aria-live='polite' className='sr-only'>
        {kopiert ? uiText.kopiert : ''}
      </span>
    </button>
  )
}
