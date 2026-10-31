import type { TOCItemType } from 'fumadocs-core/toc'
import { notFound } from 'next/navigation'
import { Randspalte } from '@/components/docs/Randspalte'
import { Seitenaktionen } from '@/components/docs/Seitenaktionen'
import { seitenuebersichtToc } from '@/components/docs/Seitenuebersicht'
import { source } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await props.params
  const page = source.getPage(slug)
  if (!page) notFound()

  const MDX = page.data.body
  const raw = await page.data.getText('raw')
  // Die Gruppen der Seitenübersicht sind Überschriften, die erst die Komponente rendert
  const toc: TOCItemType[] = raw.includes('<Seitenuebersicht')
    ? [...page.data.toc, ...seitenuebersichtToc()]
    : page.data.toc

  return (
    <div className='px-4 lg:pr-8 lg:pl-[52px] xl:grid xl:grid-cols-[minmax(0,776px)_242px] xl:justify-between xl:gap-x-[52px]'>
      <article className='flex min-w-0 flex-col gap-10 pt-8 pb-16 lg:gap-12 lg:pt-10 lg:pb-[120px]'>
        <header className='flex flex-col gap-3 lg:gap-4'>
          <h1 className='font-display font-medium text-[36px] text-ink leading-[1.2] tracking-[-0.02em] lg:text-[58px] lg:leading-none lg:tracking-normal'>
            {page.data.title}
          </h1>
          {page.data.description && (
            <p className='max-w-[640px] text-[18px] text-muted leading-normal lg:text-[20px] lg:leading-[1.4]'>
              {page.data.description}
            </p>
          )}
          <div className='pt-2 xl:hidden'>
            <Seitenaktionen pageUrl={page.url} layout='zeile' />
          </div>
        </header>
        <div className='inhalt'>
          <MDX components={getMDXComponents()} />
        </div>
      </article>
      <Randspalte toc={toc} pageUrl={page.url} />
    </div>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await props.params
  const page = source.getPage(slug)
  if (!page) notFound()

  return { title: page.data.title, description: page.data.description }
}
