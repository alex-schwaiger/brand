export type IconName =
  | 'check'
  | 'close'
  | 'copy'
  | 'extern'
  | 'file'
  | 'github'
  | 'left'
  | 'menu'
  | 'right'
  | 'search'

/**
 * Icons aus Figma liegen unverändert unter `public/icons/`. Sie dienen als Maske,
 * die Farbe kommt aus der Textfarbe und damit aus einer Farbrolle.
 */
export function Icon({
  name,
  size,
  className = '',
}: {
  name: IconName
  size: number
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={`icon ${className}`}
      style={{ width: size, height: size, maskImage: `url(/icons/${name}.svg)` }}
    />
  )
}
