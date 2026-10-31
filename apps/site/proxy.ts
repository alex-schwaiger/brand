import { type NextRequest, NextResponse } from 'next/server'
import { getAuth, isLocalMode } from './lib/auth'

// Schickt Aufrufe von /admin ohne Session zum Login und ohne zweiten Faktor zum Konto.
// Das Admin-Bundle selbst ist öffentlich; geschützt wird über isAuthorized in /api/tina/*.
export async function proxy(request: NextRequest) {
  if (isLocalMode) return NextResponse.next()

  const session = await getAuth().api.getSession({ headers: request.headers })
  if (!session) return NextResponse.redirect(new URL('/login', request.url))
  if (!session.user.twoFactorEnabled) return NextResponse.redirect(new URL('/konto', request.url))
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/index.html'],
}
