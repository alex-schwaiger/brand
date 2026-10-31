import { source } from '@/lib/source'

export interface NavPage {
  title: string
  description?: string
  url: string
}

export interface NavGroup {
  label: string
  pages: NavPage[]
}

function toNavPage(url: string): NavPage | undefined {
  const page = source.getPages().find((p) => p.url === url)
  if (!page) return undefined
  return { title: page.data.title, description: page.data.description, url: page.url }
}

/**
 * Pages in reading order, split at the separators of `content/docs/meta.json`.
 * Pages before the first separator (the start page) have no group.
 */
export function getNavigation(): { ungrouped: NavPage[]; groups: NavGroup[] } {
  const ungrouped: NavPage[] = []
  const groups: NavGroup[] = []

  for (const node of source.getPageTree().children) {
    if (node.type === 'separator') {
      groups.push({ label: String(node.name ?? ''), pages: [] })
    } else if (node.type === 'page') {
      const page = toNavPage(node.url)
      if (!page) continue
      const group = groups.at(-1)
      if (group) group.pages.push(page)
      else ungrouped.push(page)
    }
  }

  return { ungrouped, groups }
}

/** All pages in reading order, for „Zurück / Weiter“. */
export function getPageOrder(): NavPage[] {
  const { ungrouped, groups } = getNavigation()
  return [...ungrouped, ...groups.flatMap((group) => group.pages)]
}

/** Die Seitenübersicht als Markdown, für `.mdx`-Rohansichten und `llms-full.txt`. */
export function seitenuebersichtMarkdown(): string {
  return getNavigation()
    .groups.map((group) =>
      [
        `## ${group.label}`,
        '',
        ...group.pages.map((page) => `- [${page.title}](${page.url}): ${page.description ?? ''}`),
      ].join('\n'),
    )
    .join('\n\n')
}
