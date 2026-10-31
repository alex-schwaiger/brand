import { passkeyClient } from '@better-auth/passkey/client'
import { twoFactorClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  plugins: [twoFactorClient(), passkeyClient()],
})

type AuthError = { status: number; message?: string; code?: string } | null | undefined

// Better Auth liefert englische Meldungen; die Seite ist deutsch.
export function fehlertext(error: AuthError): string {
  if (!error) return 'Unbekannter Fehler.'
  if (error.status === 429) return 'Zu viele Versuche. Bitte in ein paar Minuten erneut probieren.'
  switch (error.code) {
    case 'INVALID_EMAIL_OR_PASSWORD':
    case 'INVALID_PASSWORD':
      return 'E-Mail oder Passwort stimmt nicht.'
    case 'INVALID_CODE':
    case 'INVALID_BACKUP_CODE':
      return 'Der Code stimmt nicht.'
    case 'ACCOUNT_TEMPORARILY_LOCKED':
      return 'Zu viele Fehlversuche. Das Konto ist vorübergehend gesperrt.'
    case 'INVALID_TWO_FACTOR_COOKIE':
      return 'Die Anmeldung ist abgelaufen. Bitte neu beginnen.'
  }
  if (error.status === 401) return 'Anmeldung fehlgeschlagen.'
  return error.message ?? 'Unbekannter Fehler.'
}
