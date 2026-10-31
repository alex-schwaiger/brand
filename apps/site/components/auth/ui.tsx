import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

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
        className='border border-fd-border bg-fd-background px-3 py-2 text-base outline-none focus-visible:border-fd-foreground'
        {...props}
      />
    </label>
  )
}

export function Knopf({
  variante = 'primaer',
  ...props
}: { variante?: 'primaer' | 'sekundaer' } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const stil =
    variante === 'primaer'
      ? 'bg-fd-primary text-fd-primary-foreground hover:opacity-90'
      : 'border border-fd-border text-fd-foreground hover:bg-fd-accent'
  return (
    <button
      type='button'
      className={`px-4 py-2 font-medium tracking-nav disabled:opacity-50 ${stil}`}
      {...props}
    />
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
