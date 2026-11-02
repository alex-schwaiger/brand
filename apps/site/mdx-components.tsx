import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import type { ComponentProps } from 'react'
import { ColorPalette } from '@/components/brand/ColorPalette'
import { LogoUsage } from '@/components/brand/LogoUsage'
import { Schriftstufen } from '@/components/brand/Schriftstufen'
import { TypeScale } from '@/components/brand/TypeScale'
import { Seitenuebersicht } from '@/components/docs/Seitenuebersicht'

/** Breite Tabellen scrollen auf schmalen Bildschirmen in sich, statt die Seite zu verbreitern. */
function MdxTable(props: ComponentProps<'table'>) {
  return (
    <div className='-mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0'>
      <table {...props} />
    </div>
  )
}

/** Interne Links laufen über den Next-Router, externe öffnen normal. */
function MdxLink({ href = '', ...props }: ComponentProps<'a'>) {
  if (href.startsWith('/') || href.startsWith('#')) return <Link href={href} {...props} />
  return <a href={href} rel='noreferrer' {...props} />
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    // Das eingebundene CHANGELOG.md bringt ein eigenes h1 mit; der Seitentitel ist schon das h1.
    h1: () => null,
    a: MdxLink,
    table: MdxTable,
    ColorPalette,
    LogoUsage,
    Schriftstufen,
    Seitenuebersicht,
    TypeScale,
    ...components,
  }
}
