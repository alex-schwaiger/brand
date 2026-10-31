import { defineConfig, LocalAuthProvider } from 'tinacms'
import { BetterAuthProvider } from './auth-provider'

// Token-Bausteine rendern Werte aus dem Paket (Konzept Q13, Q27): einfügbar, aber nicht editierbar.
// Tina verlangt pro Template mindestens ein Feld; das versteckte Feld wird nie befüllt und
// erscheint daher weder im Editor noch als Attribut im MDX.
const tokenBausteine = ['ColorPalette', 'TypeScale', 'LogoUsage', 'Schriftstufen'].map((name) => ({
  name,
  label: name,
  fields: [{ type: 'string' as const, name: 'unused', ui: { component: 'hidden' } }],
}))

// Lokal (TINA_PUBLIC_IS_LOCAL=true): Dateisystem, kein Login (Konzept Q30).
// Sonst selbst gehostet: Backend unter /api/tina/*, siehe tina/database.ts (ADR-0004),
// Login über Better Auth (ADR-0005).
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

export default defineConfig({
  contentApiUrlOverride: '/api/tina/gql',
  authProvider: isLocal ? new LocalAuthProvider() : new BetterAuthProvider(),
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  schema: {
    collections: [
      {
        name: 'doc',
        label: 'Seiten',
        path: 'content/docs',
        format: 'mdx',
        match: {
          // Änderungen wird aus packages/brand/CHANGELOG.md eingebunden, nicht in Tina bearbeitet
          exclude: 'aenderungen',
        },
        fields: [
          { type: 'string', name: 'title', label: 'Titel', isTitle: true, required: true },
          {
            type: 'string',
            name: 'description',
            label: 'Beschreibung',
            ui: { component: 'textarea' },
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Inhalt',
            isBody: true,
            templates: tokenBausteine,
          },
        ],
      },
    ],
  },
})
