import type { ReactNode } from 'react'
import { DocsHuelle } from '@/components/docs/DocsHuelle'

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsHuelle>{children}</DocsHuelle>
}
