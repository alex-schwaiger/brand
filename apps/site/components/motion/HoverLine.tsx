import type { ReactNode } from 'react'

/**
 * Wie im Portfolio: Eine Haarlinie zeichnet sich beim Hover der umgebenden `group/line` von links
 * unter das Label (350 ms ease-out) und läuft beim Verlassen nach rechts ab (200 ms ease-in).
 * Nichts bleibt stehen. Die Linie nimmt die Textfarbe.
 */
export function HoverLine({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span className={`relative ${className}`}>
      {children}
      <span
        aria-hidden
        className='-bottom-0.5 absolute inset-x-0 h-px origin-right scale-x-0 bg-current transition-transform duration-200 ease-in group-hover/line:origin-left group-hover/line:scale-x-100 group-hover/line:duration-[350ms] group-hover/line:ease-out group-focus-visible/line:origin-left group-focus-visible/line:scale-x-100 motion-reduce:transition-none'
      />
    </span>
  )
}
