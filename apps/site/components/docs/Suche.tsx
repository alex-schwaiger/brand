'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type KeyboardEvent, useEffect, useState } from 'react'
import { sucheTokens, type TokenTreffer } from '@/lib/token-search'
import { uiText } from '@/lib/ui-text'

/** Ein Treffer der Fumadocs-Suche unter `/api/search`. */
interface SeitenErgebnis {
  id: string
  url: string
  type: 'page' | 'heading' | 'text'
  content: string
}

export interface SeitenTreffer {
  id: string
  url: string
  titel: string
  /** Seite, auf der der Treffer liegt, oder die Gruppe bei ganzen Seiten */
  ort: string
}

type Treffer = ({ art: 'seite' } & SeitenTreffer) | ({ art: 'token'; id: string } & TokenTreffer)

/** Seitentitel und Gruppe je URL, damit Treffer ihren Ort nennen können. */
export type Seitenverzeichnis = Record<string, { titel: string; gruppe?: string }>

function entferneMarkdown(text: string) {
  return text.replace(/[*_`]/g, '').replace(/\s+/g, ' ').trim()
}

async function sucheSeiten(
  query: string,
  verzeichnis: Seitenverzeichnis,
  signal: AbortSignal,
): Promise<SeitenTreffer[]> {
  const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`, { signal })
  if (!response.ok) return []
  const ergebnisse = (await response.json()) as SeitenErgebnis[]

  const q = query.toLowerCase()
  const titelPasst = (ergebnis: SeitenErgebnis) =>
    ergebnis.type !== 'text' && ergebnis.content.toLowerCase().includes(q)

  // Seiten und Überschriften, deren Titel passt. Steht der Begriff nur im Text,
  // erscheint die Seite selbst, nicht der rohe Textausschnitt.
  const treffer = ergebnisse.filter(titelPasst)
  const nurImText = ergebnisse.filter((ergebnis) => !titelPasst(ergebnis))
  const rang = { page: 0, heading: 1, text: 2 } as const
  const gesehen = new Set<string>()

  return [
    ...treffer.toSorted((a, b) => rang[a.type] - rang[b.type]),
    ...nurImText.map((ergebnis) => ({
      ...ergebnis,
      type: 'page' as const,
      url: ergebnis.url.split('#')[0],
    })),
  ]
    .filter((ergebnis) => {
      if (gesehen.has(ergebnis.url)) return false
      gesehen.add(ergebnis.url)
      return true
    })
    .slice(0, 5)
    .map((ergebnis) => {
      const seite = verzeichnis[ergebnis.url.split('#')[0]]
      const istSeite = !ergebnis.url.includes('#')
      return {
        id: ergebnis.id,
        url: ergebnis.url,
        titel: istSeite
          ? (seite?.titel ?? entferneMarkdown(ergebnis.content))
          : entferneMarkdown(ergebnis.content),
        ort: (istSeite ? seite?.gruppe : seite?.titel) ?? '',
      }
    })
}

export function useSuche(verzeichnis: Seitenverzeichnis) {
  const [query, setQuery] = useState('')
  const [seiten, setSeiten] = useState<SeitenTreffer[]>([])
  const [auswahl, setAuswahl] = useState(0)

  useEffect(() => {
    const q = query.trim()
    if (!q) {
      setSeiten([])
      return
    }
    const controller = new AbortController()
    const timer = setTimeout(() => {
      sucheSeiten(q, verzeichnis, controller.signal)
        .then(setSeiten)
        .catch(() => {})
    }, 100)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query, verzeichnis])

  const tokens = sucheTokens(query)
  const treffer: Treffer[] = [
    ...seiten.map((seite) => ({ art: 'seite' as const, ...seite })),
    ...tokens.map((token) => ({ art: 'token' as const, id: token.name, ...token })),
  ]

  return {
    query,
    setQuery: (value: string) => {
      setQuery(value)
      setAuswahl(0)
    },
    treffer,
    auswahl: Math.min(auswahl, Math.max(treffer.length - 1, 0)),
    setAuswahl,
  }
}

export type SucheState = ReturnType<typeof useSuche>

/** Tastatur im Suchfeld: Pfeile wählen, Enter öffnet, esc schließt. */
export function useSuchtasten(suche: SucheState, schliessen: () => void) {
  const router = useRouter()
  return (event: KeyboardEvent<HTMLInputElement>) => {
    const anzahl = suche.treffer.length
    if (event.key === 'ArrowDown' && anzahl) {
      event.preventDefault()
      suche.setAuswahl((suche.auswahl + 1) % anzahl)
    } else if (event.key === 'ArrowUp' && anzahl) {
      event.preventDefault()
      suche.setAuswahl((suche.auswahl - 1 + anzahl) % anzahl)
    } else if (event.key === 'Enter' && anzahl) {
      event.preventDefault()
      router.push(suche.treffer[suche.auswahl].url)
      schliessen()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      schliessen()
    }
  }
}

export function trefferId(listId: string, index: number) {
  return `${listId}-${index}`
}

/**
 * Trefferliste im Stil von „Auf dieser Seite“: eine Zeile je Treffer, erst Seiten, dann
 * Tokens (in Mono). Der gewählte Treffer steht in Ink mit kurzem Strich davor.
 */
export function Treffer({
  suche,
  listId,
  onNavigate,
  groesse = 'desktop',
}: {
  suche: SucheState
  listId: string
  onNavigate: () => void
  groesse?: 'desktop' | 'mobil'
}) {
  const mobil = groesse === 'mobil'

  return (
    <div
      id={listId}
      role='listbox'
      aria-label={uiText.suchen}
      className={`flex flex-col ${mobil ? '' : 'gap-1.5'}`}
    >
      {suche.treffer.length === 0 && (
        <p className='text-[13px] text-muted leading-[1.4]'>{uiText.keineTreffer}</p>
      )}
      {suche.treffer.map((treffer, i) => {
        const aktiv = suche.auswahl === i
        return (
          <Link
            key={treffer.id}
            id={trefferId(listId, i)}
            href={treffer.url}
            role='option'
            aria-selected={aktiv}
            tabIndex={-1}
            onMouseMove={() => suche.setAuswahl(i)}
            onClick={onNavigate}
            className={`flex items-center gap-2.5 leading-[1.4] ${
              mobil ? 'min-h-11 text-[15px]' : 'text-[13px]'
            } ${aktiv ? 'text-ink' : 'text-muted hover:text-ink'}`}
          >
            <span aria-hidden className={`h-px w-1.5 shrink-0 ${aktiv ? 'bg-ink' : 'bg-border'}`} />
            <span className={`truncate ${treffer.art === 'token' ? 'font-mono' : ''}`}>
              {treffer.art === 'seite' ? treffer.titel : treffer.name}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
