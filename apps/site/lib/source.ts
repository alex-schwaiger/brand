import { docs } from 'collections/server'
import { llms, loader } from 'fumadocs-core/source'
import { farbrollenMarkdown } from '@/lib/farbrollen'
import { seitenuebersichtMarkdown } from '@/lib/navigation'

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
})

export async function renderPageMarkdown(page: (typeof source)['$inferPage']) {
  const processed = (await page.data.getText('processed'))
    .replace(/<Seitenuebersicht\s*\/>/, () => seitenuebersichtMarkdown())
    .replace(/<ColorPalette\b[\s\S]*?\/>/g, (tag) => farbrollenMarkdown(tag))
  return `# ${page.data.title} (${page.url})\n\n${processed}`
}

export const llmsOutput = llms(source, { renderPage: renderPageMarkdown })
