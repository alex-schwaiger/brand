'use client'

import { type FormEvent, useState } from 'react'
import { Fehler, Feld, Hinweis, Knopf } from '@/components/auth/ui'
import { authClient, fehlertext } from '@/lib/auth-client'

type Schritt = 'anmelden' | 'totp' | 'backup-code'

// Nach der Anmeldung entscheidet /login serverseitig: Editor oder, ohne zweiten Faktor, Konto.
function weiter() {
  window.location.assign('/login')
}

export function LoginFormular() {
  const [schritt, setSchritt] = useState<Schritt>('anmelden')
  const [fehler, setFehler] = useState('')
  const [laeuft, setLaeuft] = useState(false)

  async function ausfuehren(aktion: () => Promise<void>) {
    setFehler('')
    setLaeuft(true)
    try {
      await aktion()
    } finally {
      setLaeuft(false)
    }
  }

  function mitPasskey() {
    return ausfuehren(async () => {
      const { error } = await authClient.signIn.passkey()
      if (error) return setFehler(fehlertext(error))
      weiter()
    })
  }

  function mitPasswort(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    return ausfuehren(async () => {
      const { data, error } = await authClient.signIn.email({
        email: String(form.get('email')),
        password: String(form.get('passwort')),
      })
      if (error) return setFehler(fehlertext(error))
      if (data && 'twoFactorRedirect' in data && data.twoFactorRedirect) return setSchritt('totp')
      weiter()
    })
  }

  function mitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const code = String(new FormData(event.currentTarget).get('code')).replace(/\s/g, '')
    return ausfuehren(async () => {
      const { error } =
        schritt === 'totp'
          ? await authClient.twoFactor.verifyTotp({ code })
          : await authClient.twoFactor.verifyBackupCode({ code })
      if (error) return setFehler(fehlertext(error))
      weiter()
    })
  }

  if (schritt !== 'anmelden') {
    const istTotp = schritt === 'totp'
    return (
      <form onSubmit={mitCode} className='flex flex-col gap-4'>
        <Hinweis>
          {istTotp
            ? 'Code aus der Authenticator-App eingeben.'
            : 'Einen der Backup-Codes eingeben. Jeder Code gilt nur einmal.'}
        </Hinweis>
        <Feld
          key={schritt}
          label={istTotp ? 'Code' : 'Backup-Code'}
          name='code'
          required
          autoFocus
          autoComplete='one-time-code'
          inputMode={istTotp ? 'numeric' : 'text'}
        />
        <Fehler>{fehler}</Fehler>
        <Knopf type='submit' disabled={laeuft}>
          Bestätigen
        </Knopf>
        <Knopf
          variante='sekundaer'
          onClick={() => {
            setFehler('')
            setSchritt(istTotp ? 'backup-code' : 'totp')
          }}
        >
          {istTotp ? 'Backup-Code verwenden' : 'Authenticator-Code verwenden'}
        </Knopf>
      </form>
    )
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-3'>
        <Knopf onClick={mitPasskey} disabled={laeuft}>
          Mit Passkey anmelden
        </Knopf>
        <Hinweis>Passkeys funktionieren nur auf brand.alexanderschwaiger.at.</Hinweis>
      </div>
      <form onSubmit={mitPasswort} className='flex flex-col gap-4 border-fd-border border-t pt-6'>
        <Feld label='E-Mail' name='email' type='email' required autoComplete='username' />
        <Feld
          label='Passwort'
          name='passwort'
          type='password'
          required
          autoComplete='current-password'
        />
        <Fehler>{fehler}</Fehler>
        <Knopf type='submit' variante='sekundaer' disabled={laeuft}>
          Mit Passwort anmelden
        </Knopf>
      </form>
    </div>
  )
}
