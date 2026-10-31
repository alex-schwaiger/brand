import { getAuth, isLocalMode } from '@/lib/auth'

// Better-Auth-Endpunkte. Im Local Mode gibt es keinen Login (Konzept Q30).
function handler(request: Request) {
  if (isLocalMode) return new Response(null, { status: 404 })
  return getAuth().handler(request)
}

export { handler as GET, handler as POST }
