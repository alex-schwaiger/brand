'use client'

import { type FormEvent, useState } from 'react'
import { renderSVG } from 'uqr'
import { Abschnitt, Fehler, Feld, Hinweis, Knopf } from '@/components/auth/ui'
import { authClient, fehlertext } from '@/lib/auth-client'

type Props = { email: string; zweiFaktorAktiv: boolean }

export function KontoEinstellungen({ email, zweiFaktorAktiv }: Props) {
  async function abmelden() {
    await authClient.signOut()
    window.location.assign('/login')
  }

  return (
    <div className='flex flex-col gap-8'>
      <Hinweis>Angemeldet als {email}.</Hinweis>
      <ZweiterFaktor aktiv={zweiFaktorAktiv} />
      <Passkeys />
      <div className='flex gap-3'>
        {zweiFaktorAktiv && (
          <a
            href='/admin'
            className='bg-fd-primary px-4 py-2 font-medium text-fd-primary-foreground tracking-nav hover:opacity-90'
          >
            Zum Editor
          </a>
        )}
        <Knopf variante='sekundaer' onClick={abmelden}>
          Abmelden
        </Knopf>
      </div>
    </div>
  )
}

type Einrichtung = { totpURI: string; backupCodes: string[] }

function ZweiterFaktor({ aktiv }: { aktiv: boolean }) {
  const [einrichtung, setEinrichtung] = useState<Einrichtung | null>(null)
  const [fehler, setFehler] = useState('')
  const [laeuft, setLaeuft] = useState(false)

  async function starten(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const password = String(new FormData(event.currentTarget).get('passwort'))
    setFehler('')
    setLaeuft(true)
    const { data, error } = await authClient.twoFactor.enable({ password })
    setLaeuft(false)
    if (error || !data) return setFehler(fehlertext(error))
    if (data.method !== 'totp') return setFehler('TOTP ist nicht verfügbar.')
    setEinrichtung(data)
  }

  async function bestaetigen(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const code = String(new FormData(event.currentTarget).get('code')).replace(/\s/g, '')
    setFehler('')
    setLaeuft(true)
    const { error } = await authClient.twoFactor.verifyTotp({ code })
    setLaeuft(false)
    if (error) return setFehler(fehlertext(error))
    window.location.reload()
  }

  if (aktiv) {
    return (
      <Abschnitt titel='Zweiter Faktor'>
        <Hinweis>
          TOTP ist aktiv. Die Anmeldung mit Passwort verlangt zusätzlich einen Code.
        </Hinweis>
      </Abschnitt>
    )
  }

  if (!einrichtung) {
    return (
      <Abschnitt titel='Zweiter Faktor'>
        <Hinweis>
          Der Editor öffnet sich erst, wenn TOTP eingerichtet ist. Dafür das Passwort bestätigen.
        </Hinweis>
        <form onSubmit={starten} className='flex flex-col gap-4'>
          <Feld
            label='Passwort'
            name='passwort'
            type='password'
            required
            autoComplete='current-password'
          />
          <Fehler>{fehler}</Fehler>
          <Knopf type='submit' disabled={laeuft}>
            TOTP einrichten
          </Knopf>
        </form>
      </Abschnitt>
    )
  }

  const secret = new URL(einrichtung.totpURI).searchParams.get('secret') ?? ''
  return (
    <Abschnitt titel='Zweiter Faktor'>
      <Hinweis>QR-Code mit der Authenticator-App scannen oder den Schlüssel eingeben.</Hinweis>
      <div
        className='w-48 bg-white p-2'
        // SVG entsteht lokal aus der otpauth-URI, nicht aus fremden Eingaben
        // biome-ignore lint/security/noDangerouslySetInnerHtml: siehe oben
        dangerouslySetInnerHTML={{ __html: renderSVG(einrichtung.totpURI) }}
      />
      <code className='break-all font-mono text-sm'>{secret}</code>
      <Hinweis>
        Backup-Codes jetzt sicher ablegen. Sie werden nur dieses eine Mal angezeigt.
      </Hinweis>
      <ul className='grid grid-cols-2 gap-1 font-mono text-sm'>
        {einrichtung.backupCodes.map((code) => (
          <li key={code}>{code}</li>
        ))}
      </ul>
      <form onSubmit={bestaetigen} className='flex flex-col gap-4'>
        <Feld
          label='Code aus der App'
          name='code'
          required
          autoComplete='one-time-code'
          inputMode='numeric'
        />
        <Fehler>{fehler}</Fehler>
        <Knopf type='submit' disabled={laeuft}>
          Bestätigen
        </Knopf>
      </form>
    </Abschnitt>
  )
}

function Passkeys() {
  const { data: passkeys, refetch } = authClient.useListPasskeys()
  const [fehler, setFehler] = useState('')

  async function hinzufuegen() {
    setFehler('')
    const { error } = await authClient.passkey.addPasskey({ name: navigator.platform || 'Passkey' })
    if (error) return setFehler(fehlertext(error))
    refetch()
  }

  async function entfernen(id: string) {
    setFehler('')
    const { error } = await authClient.passkey.deletePasskey({ id })
    if (error) return setFehler(fehlertext(error))
    refetch()
  }

  return (
    <Abschnitt titel='Passkeys'>
      {passkeys && passkeys.length > 0 ? (
        <ul className='flex flex-col gap-2 text-sm'>
          {passkeys.map((p) => (
            <li key={p.id} className='flex items-center justify-between gap-4'>
              <span>
                {p.name ?? 'Passkey'}, angelegt am{' '}
                {new Date(p.createdAt).toLocaleDateString('de-AT')}
              </span>
              <Knopf variante='sekundaer' onClick={() => entfernen(p.id)}>
                Entfernen
              </Knopf>
            </li>
          ))}
        </ul>
      ) : (
        <Hinweis>Noch kein Passkey. Funktioniert nur auf brand.alexanderschwaiger.at.</Hinweis>
      )}
      <Fehler>{fehler}</Fehler>
      <Knopf onClick={hinzufuegen}>Passkey hinzufügen</Knopf>
    </Abschnitt>
  )
}
