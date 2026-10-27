import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import { ColorPalette } from '@/components/brand/ColorPalette'
import { LogoUsage } from '@/components/brand/LogoUsage'
import { TypeScale } from '@/components/brand/TypeScale'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return { ...defaultMdxComponents, ColorPalette, LogoUsage, TypeScale, ...components }
}
