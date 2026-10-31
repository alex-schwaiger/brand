import type { BackendAuthProvider } from '@tinacms/datalayer'

// Platzhalter bis Better Auth (#12): lehnt alles ab. `TINA_AUTH_ALLOW_ALL=true` ist nur für den
// lokalen Compose-Stack gedacht (docker-compose.yml) und fällt mit #12 wieder weg.
export const placeholderAuthProvider: BackendAuthProvider = {
  isAuthorized: async () =>
    process.env.TINA_AUTH_ALLOW_ALL === 'true'
      ? { isAuthorized: true }
      : { isAuthorized: false, errorCode: 401, errorMessage: 'Nicht angemeldet' },
}
