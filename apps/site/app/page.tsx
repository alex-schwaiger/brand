import Link from 'next/link'

export default function Home() {
  return (
    <main className='mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6'>
      <p className='font-medium text-sm text-fd-muted-foreground uppercase tracking-label'>Marke</p>
      <h1 className='font-bold text-5xl text-fd-foreground tracking-display'>
        Alexander Schwaiger
      </h1>
      <p className='text-fd-muted-foreground'>Tokens, Logo und Regeln der Marke.</p>
      <Link
        href='/docs'
        className='w-fit border border-fd-border px-4 py-2 font-medium text-fd-foreground tracking-nav hover:bg-fd-accent'
      >
        Zur Dokumentation
      </Link>
    </main>
  )
}
