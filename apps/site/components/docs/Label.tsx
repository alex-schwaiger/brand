import type { ElementType, ReactNode } from 'react'

/** Label: Versalien in Medium, Laufweite `label`, in Muted. Ordnet Gruppen, ohne Klammern. */
export function Label({
  children,
  as: Tag = 'p',
  id,
  className = '',
}: {
  children: ReactNode
  as?: ElementType
  id?: string
  className?: string
}) {
  return (
    <Tag
      id={id}
      className={`font-medium text-[11px] text-muted uppercase leading-none tracking-label ${className}`}
    >
      {children}
    </Tag>
  )
}
