'use client'

import { Fehlerinhalt } from '@/components/fehler/Fehlerinhalt'
import { fehlerWege } from '@/components/fehler/fehlerWege'
import { RetryButton } from '@/components/fehler/RetryButton'
import { siteName } from '@/lib/shareImage'
import { fehlerText } from '@/lib/ui-text'

// Eine Seite der Doku ist ausgefallen. Die Fehlerseite steht im Docs-Layout, Kopfleiste und
// Seitenleiste bleiben. Fehler im Layout selbst landen in `app/global-error.tsx`.
export default function Fehler({ retry }: { retry: () => void }) {
  return (
    <>
      <title>{`${fehlerText.fehlerMeta} | ${siteName}`}</title>
      <meta name='robots' content='noindex' />
      <Fehlerinhalt
        titel={fehlerText.fehlerTitel}
        intro={fehlerText.fehlerIntro}
        aktion={<RetryButton onClick={() => retry()} label={fehlerText.erneutLaden} />}
        wege={fehlerWege}
      />
    </>
  )
}
