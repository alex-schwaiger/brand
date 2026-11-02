'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowSwap } from '@/components/motion/ArrowSwap'
import { HoverLine } from '@/components/motion/HoverLine'
import { uiText } from '@/lib/ui-text'
import { Icon } from './Icon'

/** Rohansicht einer Seite, über die Rewrites `/:path*.mdx` und `/index.mdx` in `next.config.ts`. */
export function mdxUrl(pageUrl: string) {
  return pageUrl === '/' ? '/index.mdx' : `${pageUrl}.mdx`
}

const aktion =
  'group/line inline-flex min-h-11 items-center gap-2 text-[13px] text-body leading-[1.4] transition-colors duration-[120ms] ease-out hover:text-ink motion-reduce:transition-none'

function MarkdownKopieren({ pageUrl }: { pageUrl: string }) {
  const [kopiert, setKopiert] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function kopieren() {
    const response = await fetch(mdxUrl(pageUrl))
    if (!response.ok) return
    await navigator.clipboard.writeText(await response.text())
    setKopiert(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setKopiert(false), 2000)
  }

  return (
    <button type='button' onClick={kopieren} className={aktion}>
      <Icon name={kopiert ? 'check' : 'copy'} size={14} className={kopiert ? 'text-ink' : ''} />
      <HoverLine className={kopiert ? 'text-ink' : ''}>
        <span aria-live='polite'>{kopiert ? uiText.kopiert : uiText.markdownKopieren}</span>
      </HoverLine>
    </button>
  )
}

function MdxAnsehen({ pageUrl }: { pageUrl: string }) {
  return (
    <a href={mdxUrl(pageUrl)} target='_blank' rel='noreferrer' className={`group/arrow ${aktion}`}>
      <Icon name='file' size={14} />
      <HoverLine>{uiText.mdxAnsehen}</HoverLine>
      <ArrowSwap className='text-ink' />
      <span className='sr-only'>{uiText.neuesFenster}</span>
    </a>
  )
}

/** Desktop untereinander in der Randspalte, sonst als Zeile unter dem Lead. */
export function Seitenaktionen({
  pageUrl,
  layout,
}: {
  pageUrl: string
  layout: 'spalte' | 'zeile'
}) {
  return (
    <div
      className={
        layout === 'spalte'
          ? '-my-[2px] flex flex-col [&>*]:min-h-7'
          : '-my-[9px] flex flex-wrap gap-x-5'
      }
    >
      <MarkdownKopieren pageUrl={pageUrl} />
      <MdxAnsehen pageUrl={pageUrl} />
    </div>
  )
}
