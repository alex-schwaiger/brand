import type { BackendAuthProvider } from '@tinacms/datalayer'
import { fromNodeHeaders } from 'better-auth/node'
import { getAuth } from './auth'

// `isAuthorized` für /api/tina/* (ADR-0005). Verlangt eine Session und einen eingerichteten
// zweiten Faktor: Ohne TOTP gäbe es für Speichern nur das Passwort.
export const betterAuthBackend: BackendAuthProvider = {
  isAuthorized: async (req) => {
    const session = await getAuth().api.getSession({ headers: fromNodeHeaders(req.headers) })
    if (!session) {
      return { isAuthorized: false, errorCode: 401, errorMessage: 'Nicht angemeldet' }
    }
    if (!session.user.twoFactorEnabled) {
      return {
        isAuthorized: false,
        errorCode: 403,
        errorMessage: 'Zweiter Faktor nicht eingerichtet',
      }
    }
    return { isAuthorized: true }
  },
}
