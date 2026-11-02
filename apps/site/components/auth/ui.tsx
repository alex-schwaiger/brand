import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { HoverLine } from '@/components/motion/HoverLine'
import { RedrawRule } from '@/components/motion/RedrawRule'

// Bausteine für Login und Konto. Die Texte gehören zur Bedienung des Editors, nicht zur
// Brand-Seite, und liegen deshalb nicht in Tina.

export function Rahmen({ titel, children }: { titel: string; children: ReactNode }) {
  return (
    <main className='mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-8 px-6 py-12'>
      <div className='flex flex-col gap-2'>
        <p className='font-medium text-fd-muted-foreground text-sm uppercase tracking-label'>
          Editor
        </p>
        <h1 className='font-bold text-3xl text-fd-foreground tracking-display'>{titel}</h1>
      </div>
      {children}
    </main>
  )
}

export function Abschnitt({ titel, children }: { titel: string; children: ReactNode }) {
  return (
    <section className='flex flex-col gap-4 border-fd-border border-t pt-6'>
      <h2 className='font-medium text-fd-foreground text-lg'>{titel}</h2>
      {children}
    </section>
  )
}

export function Feld({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className='flex flex-col gap-1.5 text-fd-foreground text-sm'>
      <span className='font-medium'>{label}</span>
      <input
        className='border-0 border-fd-border border-b bg-transparent px-0 py-2 text-base outline-none transition-colors duration-[120ms] ease-out focus:border-fd-foreground motion-reduce:transition-none'
        {...props}
      />
    </label>
  )
}

/** Klassen des unterstrichenen Knopfs, auch für Links, die wie ein Knopf stehen (Zum Editor). */
export const unterstrichen =
  'group/underline relative inline-flex w-fit cursor-pointer items-center gap-3.5 px-8 pb-3 text-base text-fd-foreground disabled:pointer-events-none disabled:opacity-40'

/**
 * Knöpfe wie im Portfolio. Primär ist der unterstrichene Knopf mit der neu gezeichneten Linie
 * (`RedrawRule`), sekundär ein ruhiger Textknopf mit der `HoverLine`.
 */
export function Knopf({
  variante = 'primaer',
  children,
  className = '',
  ...props
}: { variante?: 'primaer' | 'sekundaer' } & ButtonHTMLAttributes<HTMLButtonElement>) {
  if (variante === 'sekundaer') {
    return (
      <button
        type='button'
        className={`group/line inline-flex min-h-11 w-fit cursor-pointer items-center text-fd-muted-foreground text-sm transition-colors duration-[120ms] ease-out hover:text-fd-foreground disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none ${className}`}
        {...props}
      >
        <HoverLine>{children}</HoverLine>
      </button>
    )
  }
  return (
    <button type='button' className={`${unterstrichen} ${className}`} {...props}>
      {children}
      <RedrawRule />
    </button>
  )
}

export function Fehler({ children }: { children: ReactNode }) {
  if (!children) return null
  return (
    <p role='alert' className='border-error border-l-2 pl-3 text-fd-foreground text-sm'>
      {children}
    </p>
  )
}

export function Hinweis({ children }: { children: ReactNode }) {
  return <p className='text-fd-muted-foreground text-sm'>{children}</p>
}
