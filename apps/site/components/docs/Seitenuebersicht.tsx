import type { TOCItemType } from 'fumadocs-core/toc'
import Link from 'next/link'
import { Fragment } from 'react'
import { getNavigation } from '@/lib/navigation'

function gruppenId(label: string) {
  return label.toLowerCase()
}

/** TOC-Einträge für die Gruppen, die die Seitenübersicht als Überschriften rendert. */
export function seitenuebersichtToc(): TOCItemType[] {
  return getNavigation().groups.map((group) => ({
    title: group.label,
    url: `#${gruppenId(group.label)}`,
    depth: 2,
  }))
}

/**
 * Alle Seiten aus dem Seitenbaum mit ihrer Frontmatter-`description`, gruppiert nach den
 * Trennern in `content/docs/meta.json` (Grundlagen, Paket).
 */
export function Seitenuebersicht() {
  const { groups } = getNavigation()

  return (
    <>
      {groups.map((group) => (
        <Fragment key={group.label}>
          <h2 id={gruppenId(group.label)}>{group.label}</h2>
          <div className='linientabelle [--name-breite:120px] lg:[--name-breite:200px]'>
            {group.pages.map((page) => (
              <div key={page.url} className='linientabelle-zeile'>
                <Link href={page.url} className='linientabelle-name hover:underline'>
                  {page.title}
                </Link>
                <p>{page.description}</p>
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </>
  )
}
