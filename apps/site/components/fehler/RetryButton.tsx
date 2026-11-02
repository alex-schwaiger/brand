'use client'

import { Icon } from '@/components/docs/Icon'
import { RedrawRule } from '@/components/motion/RedrawRule'

/**
 * Der unterstrichene Knopf, der dieselbe Seite neu lädt, wie im Portfolio. Er führt nirgendwohin
 * und trägt deshalb kein `↗`: Beim Hover dreht sich das `↻` einmal in seine Richtung, während die
 * Linie sich neu zeichnet.
 */
export function RetryButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='group/underline relative inline-flex w-fit cursor-pointer items-center gap-3.5 pb-3 text-[16px] text-ink'
    >
      {label}
      <Icon
        name='retry'
        size={16}
        className='transition-transform duration-[450ms] ease-in-out group-hover/underline:rotate-360 motion-reduce:transition-none'
      />
      <RedrawRule />
    </button>
  )
}
