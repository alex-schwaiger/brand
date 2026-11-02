import type { Metadata } from 'next'
import { DocsHuelle } from '@/components/docs/DocsHuelle'
import { Fehlerinhalt, type Weg } from '@/components/fehler/Fehlerinhalt'
import { source } from '@/lib/source'
import { fehlerText, nichtGefundenWege } from '@/lib/ui-text'

export const metadata: Metadata = {
  title: fehlerText.nichtGefundenMeta,
  robots: { index: false },
}

// Jede unbekannte Adresse landet hier, auch ein `notFound()` aus der Doku. Die Seite bringt
// Kopfleiste und Seitenleiste selbst mit, damit Suche und Navigation weiterhelfen.
export default function NotFound() {
  const wege: Weg[] = nichtGefundenWege.flatMap((url) => {
    const page = source.getPages().find((p) => p.url === url)
    return page ? [{ label: page.data.title, href: page.url }] : []
  })

  return (
    <DocsHuelle>
      <Fehlerinhalt
        titel={fehlerText.nichtGefundenTitel}
        intro={fehlerText.nichtGefundenIntro}
        wege={wege}
      />
    </DocsHuelle>
  )
}
