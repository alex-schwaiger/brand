import { Icon } from '@/components/docs/Icon'

/**
 * Das `↗` jedes Links, der weiterführt, wie im Portfolio: Beim Hover der umgebenden `group/arrow`
 * fliegt der Pfeil oben rechts hinaus, ein neuer folgt von unten links (300 ms, der zweite 75 ms später).
 */
export function ArrowSwap({ size = 13, className = '' }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={`relative inline-block shrink-0 overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <Icon
        name='extern'
        size={size}
        className='absolute inset-0 transition-transform duration-300 ease-in-out group-hover/arrow:-translate-y-full group-hover/arrow:translate-x-full motion-reduce:transition-none'
      />
      <Icon
        name='extern'
        size={size}
        className='-translate-x-full absolute inset-0 translate-y-full transition-transform duration-300 ease-in-out group-hover/arrow:translate-x-0 group-hover/arrow:translate-y-0 group-hover/arrow:delay-75 motion-reduce:transition-none'
      />
    </span>
  )
}
