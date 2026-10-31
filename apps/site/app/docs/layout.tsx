import type { ReactNode } from 'react'
import { Kopfleiste } from '@/components/docs/Kopfleiste'
import { Seitenleiste } from '@/components/docs/Navigation'
import type { Seitenverzeichnis } from '@/components/docs/Suche'
import { logoDataUri, paketVersion } from '@/lib/assets'
import { getNavigation } from '@/lib/navigation'

export default function Layout({ children }: { children: ReactNode }) {
  const { ungrouped, groups } = getNavigation()

  const verzeichnis: Seitenverzeichnis = {}
  for (const page of ungrouped) verzeichnis[page.url] = { titel: page.title }
  for (const group of groups) {
    for (const page of group.pages)
      verzeichnis[page.url] = { titel: page.title, gruppe: group.label }
  }

  return (
    <>
      <Kopfleiste
        groups={groups}
        verzeichnis={verzeichnis}
        logoSrc={logoDataUri('logo-darkblue.svg')}
        paketVersion={paketVersion()}
      />
      {/* Container wie im Portfolio: auf großen Bildschirmen höchstens 1680 px breit, mittig */}
      <div className='mx-auto w-full max-w-[1680px] lg:grid lg:grid-cols-[280px_minmax(0,1fr)]'>
        <Seitenleiste groups={groups} />
        {children}
      </div>
    </>
  )
}
