import { ArrowSwap } from '@/components/motion/ArrowSwap'

/**
 * Der Pfeil der „Wege weiter“, wie im Portfolio: Beim Hover der umgebenden `group/link` zeichnet sich
 * ein Ring um den Pfeil, von der Textseite her (450 ms ease-out, zurück 200 ms ease-in). Der Pfeil
 * selbst tauscht über `ArrowSwap`, der Link braucht dafür auch `group/arrow`.
 */
export function RingArrow() {
  return (
    <span className='relative grid size-7 shrink-0 place-items-center'>
      <svg
        viewBox='0 0 28 28'
        fill='none'
        aria-hidden
        className='absolute inset-0 size-full rotate-180'
      >
        <circle
          cx='14'
          cy='14'
          r='13.5'
          stroke='currentColor'
          strokeWidth='1'
          pathLength={1}
          strokeDasharray='1'
          strokeDashoffset='1'
          className='transition-[stroke-dashoffset] duration-200 ease-in group-hover/link:duration-[450ms] group-hover/link:ease-out group-hover/link:[stroke-dashoffset:0] group-focus-visible/link:[stroke-dashoffset:0] motion-reduce:transition-none'
        />
      </svg>
      <ArrowSwap />
    </span>
  )
}
