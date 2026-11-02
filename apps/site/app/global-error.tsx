'use client'

import { Fehlerinhalt } from '@/components/fehler/Fehlerinhalt'
import { fehlerWege } from '@/components/fehler/fehlerWege'
import { RetryButton } from '@/components/fehler/RetryButton'
import { siteName } from '@/lib/shareImage'
import { fehlerText, uiText } from '@/lib/ui-text'
import './global.css'

// Das Root-Layout ist ausgefallen: Seine Metadaten lesen den Inhalt, ein kaputter Inhalt endet also
// hier. Die Seite ersetzt das Layout, bringt darum eigenes <html>, Styles und Titel mit und lässt weg,
// was erneut scheitern könnte: Inhalt, Navigation, Dateizugriffe. Das Signet kommt über /icon.svg.
export default function GlobalError({ retry }: { retry: () => void }) {
  return (
    <html lang='de'>
      <head>
        <title>{`${fehlerText.fehlerMeta} | ${siteName}`}</title>
        <meta name='robots' content='noindex' />
      </head>
      <body>
        <header className='mx-auto flex h-16 w-full max-w-[1680px] items-center pl-4 lg:h-24 lg:px-8'>
          <a
            href='/docs'
            aria-label={uiText.startseite}
            className='flex min-h-11 min-w-11 items-center'
          >
            {/* biome-ignore lint/performance/noImgElement: SVG aus dem Paket, keine Rasterbild-Optimierung nötig */}
            <img src='/icon.svg' alt='' className='h-9 w-[29px] lg:h-[62px] lg:w-[50px]' />
          </a>
        </header>
        <main className='mx-auto w-full max-w-[1680px] lg:pl-[280px]'>
          <Fehlerinhalt
            titel={fehlerText.fehlerTitel}
            intro={fehlerText.fehlerIntro}
            aktion={<RetryButton onClick={() => retry()} label={fehlerText.erneutLaden} />}
            wege={fehlerWege}
            harteLinks
          />
        </main>
      </body>
    </html>
  )
}
