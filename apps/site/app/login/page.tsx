import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { Rahmen } from '@/components/auth/ui'
import { getAuth, isLocalMode } from '@/lib/auth'
import { LoginFormular } from './login-formular'

export const metadata: Metadata = {
  title: 'Anmelden',
  robots: { index: false },
}

export default async function LoginPage() {
  if (isLocalMode) notFound()
  const session = await getAuth().api.getSession({ headers: await headers() })
  if (session) redirect(session.user.twoFactorEnabled ? '/admin' : '/konto')

  return (
    <Rahmen titel='Anmelden'>
      <LoginFormular />
    </Rahmen>
  )
}
