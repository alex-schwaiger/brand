/**
 * Die Unterlinie der unterstrichenen Knöpfe, wie im Portfolio: Beim Hover der umgebenden
 * `group/underline` läuft die Linie nach rechts ab (250 ms ease-in) und zeichnet sich von links
 * neu (450 ms ease-out, 150 ms später). Der Knopf braucht `relative` und Innenabstand unten.
 */
export function RedrawRule() {
  return (
    <>
      <span
        aria-hidden
        className='absolute inset-x-0 bottom-0 h-px origin-right bg-current transition-transform delay-100 duration-300 ease-out group-hover/underline:scale-x-0 group-hover/underline:delay-0 group-hover/underline:duration-[250ms] group-hover/underline:ease-in motion-reduce:transition-none'
      />
      <span
        aria-hidden
        className='absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-200 ease-in group-hover/underline:scale-x-100 group-hover/underline:delay-150 group-hover/underline:duration-[450ms] group-hover/underline:ease-out motion-reduce:transition-none'
      />
    </>
  )
}
