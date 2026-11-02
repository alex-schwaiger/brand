import { color } from '@alex-schwaiger/brand/tokens'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { ogImages, SITE_URL, siteName, twitterImages } from '@/lib/shareImage'
import { source } from '@/lib/source'
import './global.css'

export const viewport: Viewport = {
  themeColor: color.ink,
  viewportFit: 'cover',
}

// Beschreibung der Startseite aus Tina, damit der Text nur an einer Stelle steht
const description = source.getPage([])?.data.description

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  icons: { icon: { url: '/icon.svg', type: 'image/svg+xml' } },
  openGraph: {
    title: siteName,
    description,
    siteName,
    locale: 'de_AT',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
    images: twitterImages,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='de'>
      <body>{children}</body>
    </html>
  )
}
