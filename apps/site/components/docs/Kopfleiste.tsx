'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import type { NavGroup } from '@/lib/navigation'
import { githubUrl, uiText } from '@/lib/ui-text'
import { Icon } from './Icon'
import { MenueFuss, NavGroups } from './Navigation'
import { type Seitenverzeichnis, Treffer, trefferId, useSuche, useSuchtasten } from './Suche'

const desktop = '(min-width: 1024px)'

function Wortmarke({ src, className }: { src: string; className: string }) {
  return (
    <Link
      href='/docs'
      aria-label={uiText.startseite}
      className='flex min-h-11 min-w-11 items-center'
    >
      {/* biome-ignore lint/performance/noImgElement: SVG aus dem Paket, keine Rasterbild-Optimierung nötig */}
      <img src={src} alt='' className={className} />
    </Link>
  )
}

function GithubLink() {
  return (
    <a
      href={githubUrl}
      target='_blank'
      rel='noreferrer'
      aria-label={`${uiText.github} ${uiText.neuesFenster}`}
      className='-m-[13px] flex size-11 items-center justify-center text-ink'
    >
      <Icon name='github' size={18} />
    </a>
  )
}

/** Symbol-Taste der mobilen Kopfleiste: 44 × 44 Trefferfläche, ohne Rahmen. */
function SymbolTaste({
  icon,
  label,
  expanded,
  controls,
  onClick,
}: {
  icon: 'search' | 'menu' | 'close'
  label: string
  expanded: boolean
  controls: string
  onClick: () => void
}) {
  return (
    <button
      type='button'
      aria-label={label}
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      className='flex size-11 shrink-0 items-center justify-center text-ink'
    >
      <Icon name={icon} size={18} />
    </button>
  )
}

function Abdunklung({ onClick, className }: { onClick: () => void; className: string }) {
  return (
    <div
      aria-hidden
      onClick={onClick}
      className={`fixed inset-x-0 bottom-0 z-30 bg-canvas/90 ${className}`}
    />
  )
}

export function Kopfleiste({
  groups,
  verzeichnis,
  logoSrc,
  paketVersion,
}: {
  groups: NavGroup[]
  verzeichnis: Seitenverzeichnis
  logoSrc: string
  paketVersion: string
}) {
  const pathname = usePathname()
  const suche = useSuche(verzeichnis)
  const [sucheOffen, setSucheOffen] = useState(false)
  const [menueOffen, setMenueOffen] = useState(false)
  const desktopFeld = useRef<HTMLInputElement>(null)
  const mobilFeld = useRef<HTMLInputElement>(null)
  const listeDesktop = useId()
  const listeMobil = useId()
  const menueId = useId()
  const sucheMobilId = useId()

  function schliessen() {
    setSucheOffen(false)
    setMenueOffen(false)
    desktopFeld.current?.blur()
  }

  function alleSchliessen() {
    schliessen()
    suche.setQuery('')
  }

  const tasten = useSuchtasten(suche, schliessen)

  function sucheAusMenue() {
    setMenueOffen(false)
    setSucheOffen(true)
    requestAnimationFrame(() => mobilFeld.current?.focus())
  }

  // ⌘K / Strg+K fokussiert das Suchfeld, esc schließt Menü und Suche
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setMenueOffen(false)
        setSucheOffen(true)
        if (window.matchMedia(desktop).matches) desktopFeld.current?.focus()
        else requestAnimationFrame(() => mobilFeld.current?.focus())
      } else if (event.key === 'Escape') {
        setMenueOffen(false)
        setSucheOffen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Neue Seite: Menü und Suche zu
  // biome-ignore lint/correctness/useExhaustiveDependencies: reagiert nur auf den Seitenwechsel
  useEffect(() => {
    setMenueOffen(false)
    setSucheOffen(false)
  }, [pathname])

  // Offenes Menü sperrt das Scrollen der Seite dahinter
  useEffect(() => {
    if (!menueOffen) return
    const vorher = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = vorher
    }
  }, [menueOffen])

  const trefferOffen = sucheOffen && suche.query.trim() !== ''

  return (
    <header className='sticky top-0 z-40 bg-canvas'>
      {/* Desktop ab 1024 px */}
      <div className='mx-auto hidden h-24 w-full max-w-[1680px] items-center px-8 lg:flex'>
        <Wortmarke src={logoSrc} className='h-[62px] w-[50px]' />
        <div className='flex-1' />
        <div className='flex items-center gap-6'>
          <search
            className='relative'
            onBlur={(event) => {
              // Fokus verlässt Feld und Treffer, etwa per Tab: Treffer schließen
              if (!event.currentTarget.contains(event.relatedTarget)) setSucheOffen(false)
            }}
          >
            <input
              ref={desktopFeld}
              type='search'
              role='combobox'
              aria-label={uiText.suchen}
              aria-expanded={trefferOffen}
              aria-controls={listeDesktop}
              aria-autocomplete='list'
              aria-activedescendant={
                trefferOffen && suche.treffer.length
                  ? trefferId(listeDesktop, suche.auswahl)
                  : undefined
              }
              placeholder={uiText.suchePlatzhalter}
              value={suche.query}
              onChange={(event) => {
                suche.setQuery(event.target.value)
                setSucheOffen(true)
              }}
              onFocus={() => setSucheOffen(true)}
              onKeyDown={tasten}
              className='suchfeld h-8 w-[200px]'
            />
            {trefferOffen && (
              <div className='absolute top-full left-0 z-40 w-[242px] bg-canvas pt-5 pb-8'>
                <Treffer suche={suche} listId={listeDesktop} onNavigate={alleSchliessen} />
              </div>
            )}
          </search>
          <GithubLink />
        </div>
      </div>

      {/* Mobil unter 1024 px */}
      <div className='flex h-14 items-center gap-2.5 pr-1 pl-4 lg:hidden'>
        <Wortmarke src={logoSrc} className='h-[22.5px] w-[18.125px]' />
        <div className='flex-1' />
        <SymbolTaste
          icon={sucheOffen ? 'close' : 'search'}
          label={sucheOffen ? uiText.sucheSchliessen : uiText.sucheOeffnen}
          expanded={sucheOffen}
          controls={sucheMobilId}
          onClick={() => {
            setMenueOffen(false)
            setSucheOffen(!sucheOffen)
            if (!sucheOffen) requestAnimationFrame(() => mobilFeld.current?.focus())
          }}
        />
        <SymbolTaste
          icon={menueOffen ? 'close' : 'menu'}
          label={menueOffen ? uiText.menueSchliessen : uiText.menueOeffnen}
          expanded={menueOffen}
          controls={menueId}
          onClick={() => {
            setSucheOffen(false)
            setMenueOffen(!menueOffen)
          }}
        />
      </div>

      {sucheOffen && (
        <div id={sucheMobilId} className='absolute inset-x-0 top-14 z-40 bg-canvas lg:hidden'>
          <div className='px-4 pt-2'>
            <input
              ref={mobilFeld}
              type='search'
              role='combobox'
              aria-label={uiText.suchen}
              aria-expanded={suche.query.trim() !== ''}
              aria-controls={listeMobil}
              aria-autocomplete='list'
              aria-activedescendant={
                suche.treffer.length ? trefferId(listeMobil, suche.auswahl) : undefined
              }
              placeholder={uiText.suchePlatzhalter}
              value={suche.query}
              onChange={(event) => suche.setQuery(event.target.value)}
              onKeyDown={tasten}
              className='suchfeld h-11 w-full text-[16px]'
            />
          </div>
          {suche.query.trim() !== '' && (
            <div className='px-4 pt-3 pb-6'>
              <Treffer
                suche={suche}
                listId={listeMobil}
                onNavigate={alleSchliessen}
                groesse='mobil'
              />
            </div>
          )}
        </div>
      )}

      {menueOffen && (
        <div
          id={menueId}
          className='fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col gap-8 overflow-y-auto bg-canvas pt-6 pr-4 pb-8 pl-8 lg:hidden'
        >
          {/* Tippen gehört zur Suche: das Feld im Menü wechselt in die Suchansicht */}
          <input
            type='search'
            aria-label={uiText.suchen}
            placeholder={uiText.suchePlatzhalter}
            value={suche.query}
            onFocus={sucheAusMenue}
            onChange={(event) => {
              suche.setQuery(event.target.value)
              sucheAusMenue()
            }}
            className='suchfeld h-11 w-full text-[16px]'
          />
          <nav aria-label={uiText.navigation} className='flex flex-col gap-8'>
            <NavGroups groups={groups} groesse='mobil' onNavigate={() => setMenueOffen(false)} />
          </nav>
          <div className='flex-1' />
          <MenueFuss paketVersion={paketVersion} />
        </div>
      )}

      {trefferOffen && <Abdunklung onClick={schliessen} className='top-24 hidden lg:block' />}
      {sucheOffen && <Abdunklung onClick={schliessen} className='top-14 lg:hidden' />}
    </header>
  )
}
