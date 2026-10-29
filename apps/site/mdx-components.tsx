import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import { ColorPalette } from '@/components/brand/ColorPalette'
import { LogoUsage } from '@/components/brand/LogoUsage'
import { Schriftstufen } from '@/components/brand/Schriftstufen'
import { TypeScale } from '@/components/brand/TypeScale'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    // The included CHANGELOG.md brings its own h1; the page title already is the h1.
    h1: defaultMdxComponents.h2,
    ColorPalette,
    LogoUsage,
    Schriftstufen,
    TypeScale,
    ...components,
  }
}
