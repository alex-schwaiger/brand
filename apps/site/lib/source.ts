import { docs } from 'collections/server'
import { llms, loader } from 'fumadocs-core/source'

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
})

export async function renderPageMarkdown(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed')
  return `# ${page.data.title} (${page.url})\n\n${processed}`
}

export const llmsOutput = llms(source, { renderPage: renderPageMarkdown })
