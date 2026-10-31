'use client'

import { AnchorProvider, type TOCItemType, useActiveAnchor } from 'fumadocs-core/toc'
import { uiText } from '@/lib/ui-text'
import { Label } from './Label'
import { Seitenaktionen } from './Seitenaktionen'

function Inhaltsverzeichnis({ items }: { items: TOCItemType[] }) {
  const active = useActiveAnchor()

  return (
    <nav aria-labelledby='toc-label' className='flex flex-col gap-4'>
      <Label id='toc-label'>{uiText.aufDieserSeite}</Label>
      <ul className='flex flex-col gap-1.5'>
        {items.map((item) => {
          const isActive = active === item.url.slice(1)
          return (
            <li key={item.url}>
              <a
                href={item.url}
                aria-current={isActive ? 'location' : undefined}
                className={`group flex items-center gap-2.5 text-[13px] leading-[1.4] ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                <span
                  aria-hidden
                  className={`h-px w-1.5 shrink-0 ${isActive ? 'bg-ink' : 'bg-border group-hover:bg-ink'}`}
                />
                {item.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/** Randspalte ab 1280 px: Inhaltsverzeichnis und Seitenaktionen. */
export function Randspalte({ toc, pageUrl }: { toc: TOCItemType[]; pageUrl: string }) {
  const items = toc.filter((item) => item.depth === 2)

  return (
    <aside className='sticky top-24 hidden self-start max-h-[calc(100dvh-6rem)] flex-col gap-10 overflow-y-auto pt-10 pb-8 xl:flex'>
      {items.length > 0 && (
        <AnchorProvider toc={items} single>
          <Inhaltsverzeichnis items={items} />
        </AnchorProvider>
      )}
      <div className='flex flex-col gap-2.5'>
        <Label>{uiText.dieseSeite}</Label>
        <Seitenaktionen pageUrl={pageUrl} layout='spalte' />
      </div>
    </aside>
  )
}
