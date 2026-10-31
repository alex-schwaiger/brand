import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { Rahmen } from '@/components/auth/ui'
import { getAuth, isLocalMode } from '@/lib/auth'
import { KontoEinstellungen } from './konto-einstellungen'

export const metadata: Metadata = {
  title: 'Konto',
  robots: { index: false },
}

export default async function KontoPage() {
  if (isLocalMode) notFound()
  // headers() zuerst: macht die Seite dynamisch, bevor getAuth() beim Build die Env verlangt
  const requestHeaders = await headers()
  const session = await getAuth().api.getSession({ headers: requestHeaders })
  if (!session) redirect('/login')

  return (
    <Rahmen titel='Konto'>
      <KontoEinstellungen
        email={session.user.email}
        zweiFaktorAktiv={Boolean(session.user.twoFactorEnabled)}
      />
    </Rahmen>
  )
}
