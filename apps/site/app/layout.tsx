import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './global.css'

export const metadata: Metadata = {
  title: {
    default: 'Marke Alexander Schwaiger',
    template: '%s · Marke Alexander Schwaiger',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='de'>
      <body>{children}</body>
    </html>
  )
}
