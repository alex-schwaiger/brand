import { AbstractAuthProvider } from 'tinacms'

// Eigener Tina-Auth-Provider für Better Auth (ADR-0005). Die Session steckt in einem
// HTTP-only-Cookie, das der Browser bei jedem Aufruf an /api/tina/* mitschickt; ein Token
// braucht Tina deshalb nicht. Läuft im Admin-Bundle, daher nur fetch und keine Server-Imports.
export class BetterAuthProvider extends AbstractAuthProvider {
  async authenticate() {
    window.location.assign('/login')
    // Die Seite wird verlassen; Tina soll bis dahin nicht weitermachen.
    return new Promise<never>(() => {})
  }

  async getUser() {
    const res = await fetch('/api/auth/get-session', { credentials: 'same-origin' })
    if (!res.ok) return null
    const session = (await res.json()) as { user?: { twoFactorEnabled?: boolean } } | null
    // Ohne zweiten Faktor lehnt das Backend ab (lib/tina-auth.ts); /konto richtet ihn ein.
    return session?.user?.twoFactorEnabled ? session.user : null
  }

  // Leeres Token: Tina hängt keinen Authorization-Header an, wertet es aber als angemeldet.
  async getToken() {
    return { id_token: '' }
  }

  async logout() {
    await fetch('/api/auth/sign-out', { method: 'POST', credentials: 'same-origin' })
    window.location.assign('/login')
  }

  // Ohne Bearer-Token würde die Basisklasse ein 401 nicht als abgelaufene Session melden.
  async fetchWithToken(input: RequestInfo, init?: RequestInit) {
    const res = await fetch(input, { ...init, credentials: 'same-origin' })
    if (res.status === 401) this.sessionExpiredListener?.()
    return res
  }
}
