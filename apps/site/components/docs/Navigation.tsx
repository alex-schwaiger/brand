'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavGroup } from '@/lib/navigation'
import { agentLinks, githubUrl, uiText } from '@/lib/ui-text'
import { Icon } from './Icon'
import { Label } from './Label'

type Groesse = 'desktop' | 'mobil'

/**
 * Seitenlink. Aktiv steht der Name in `ink` Medium zwischen `[` und `]`; die linke
 * Klammer hängt in den Rand, damit alle Seitennamen auf einer Kante bleiben.
 */
function NavItem({
  title,
  url,
  active,
  groesse,
  onNavigate,
}: {
  title: string
  url: string
  active: boolean
  groesse: Groesse
  onNavigate?: () => void
}) {
  const mobil = groesse === 'mobil'

  return (
    <li>
      <Link
        href={url}
        onClick={onNavigate}
        aria-current={active ? 'page' : undefined}
        className={`group relative flex w-fit items-center gap-1.5 leading-[1.4] ${
          mobil
            ? 'h-11 text-[20px]'
            : // Fokus: 1 px Rahmen in ink mit 4 px Innenabstand, ohne die Textkante zu verschieben
              '-mx-1 h-8 rounded-sm px-1 text-[15px] focus-visible:outline-1 focus-visible:outline-offset-0'
        } ${active ? 'font-medium text-ink tracking-nav' : 'text-body hover:text-ink focus-visible:text-ink'}`}
      >
        {active && (
          <span
            aria-hidden
            className={`absolute font-normal tracking-normal ${mobil ? '-left-[15px]' : '-left-2'}`}
          >
            [
          </span>
        )}
        <span
          className={
            mobil || active
              ? ''
              : 'decoration-1 decoration-ink underline-offset-4 group-hover:underline'
          }
        >
          {title}
        </span>
        {active && (
          <span aria-hidden className='font-normal tracking-normal'>
            ]
          </span>
        )}
      </Link>
    </li>
  )
}

export function NavGroups({
  groups,
  groesse,
  onNavigate,
}: {
  groups: NavGroup[]
  groesse: Groesse
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const mobil = groesse === 'mobil'

  return (
    <>
      {groups.map((group) => {
        const id = `nav-${groesse}-${group.label.toLowerCase()}`
        return (
          <div key={group.label} className='flex flex-col'>
            <Label id={id} className={mobil ? 'mb-2' : 'mb-2.5'}>
              {group.label}
            </Label>
            <ul aria-labelledby={id}>
              {group.pages.map((page) => (
                <NavItem
                  key={page.url}
                  {...page}
                  active={pathname === page.url}
                  groesse={groesse}
                  onNavigate={onNavigate}
                />
              ))}
            </ul>
          </div>
        )
      })}
    </>
  )
}

export function AgentLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label className='mb-0.5'>{uiText.fuerAgents}</Label>
      <ul className='flex flex-col gap-2'>
        {agentLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target='_blank'
              rel='noreferrer'
              className='group inline-flex items-center gap-1.5 text-[13px] text-body leading-[1.4] hover:text-ink'
            >
              {link.label}
              <Icon name='extern' size={13} className='text-ink' />
              <span className='sr-only'>{uiText.neuesFenster}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Seitenleiste ab 1024 px: Gruppen oben, „Für Agents“ unten. */
export function Seitenleiste({ groups }: { groups: NavGroup[] }) {
  return (
    <nav
      aria-label={uiText.navigation}
      className='sticky top-24 hidden h-[calc(100dvh-6rem)] w-[280px] flex-col gap-7 overflow-y-auto pt-10 pr-4 pb-8 pl-8 lg:flex'
    >
      <NavGroups groups={groups} groesse='desktop' />
      <div className='flex-1' />
      <AgentLinks />
    </nav>
  )
}

/** Fuß des mobilen Menüs: Agent-Dateien und GitHub in einer Zeile, darunter die Paketversion. */
export function MenueFuss({ paketVersion }: { paketVersion: string }) {
  const links = [...agentLinks, { label: uiText.githubKurz, href: githubUrl }]
  return (
    <div className='flex flex-col gap-3'>
      <ul className='flex flex-wrap gap-x-5'>
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target='_blank'
              rel='noreferrer'
              className='inline-flex min-h-11 items-center gap-1.5 text-[13px] text-body leading-[1.4] hover:text-ink'
            >
              {link.label}
              <Icon name='extern' size={13} className='text-ink' />
              <span className='sr-only'>{uiText.neuesFenster}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className='font-mono text-[11px] text-muted leading-[1.4]'>
        {uiText.paket} v{paketVersion}
      </p>
    </div>
  )
}
