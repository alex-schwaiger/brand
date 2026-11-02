/** Öffentliche Adresse der Brand-Seite; löst relative URLs in den Metadaten auf. */
export const SITE_URL = 'https://brand.alexanderschwaiger.at'

/** Name der Brand-Seite für `og:site_name` und die Titelvorlage. */
export const siteName = 'Marke Alexander Schwaiger'

/**
 * Das eine Vorschaubild der Brand-Seite, im Aufbau des Portfolio-Bilds. Next.js
 * ersetzt `openGraph` und `twitter` einer Seite, statt sie mit denen des Layouts
 * zu mischen, darum setzt jede Seite mit eigenen Werten diese Bilder mit.
 */
const image = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Alexander Schwaiger. Marke: Logo & Farben, Typografie & Tonalität, Tokens & Assets.',
}

export const ogImages = [image]
export const twitterImages = [image.url]
