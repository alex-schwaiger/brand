# CLAUDE.md

This repo is the source of the Marke: the Brand-Seite (`apps/site`) and the Paket `@alex-schwaiger/brand` (`packages/brand`). Every Konsument, starting with the portfolio, takes its Tokens and Assets from the Paket; the portfolio defines no Tokens of its own. Scope, audience and the reasoning behind both → `docs/concept.md`.

## Domain language

Naming tokens, pages, components, copy or issues → `GLOSSARY.md` holds the canonical terms and the words to avoid.

## Decisions

Touching token format, how Konsumenten get the Paket, fonts, hosting, TinaCMS or login → read the matching ADR in `docs/adr/` first. Reversing one means a new ADR.

## Tokens

- The DTCG JSON in `packages/brand/tokens/` is the only place a Token is edited. Everything in `packages/brand/dist/`, `theme.css` included, is generated.
- After every Token change run `TODO: generator command` and commit `dist/` together with the JSON; CI fails on a stale `dist/`.
- Font files stay outside the repo; the Paket carries font-family names only (license, ADR 0003).

## TinaCMS

- After any Tina schema change run `TODO: Tina type generation command` and commit the result.
- Text shown on the Brand-Seite lives in the Tina-managed MDX under `TODO: content path`; components render it and hold none of it. Values in the Token-Bausteine come from the Paket, never from Tina.

## Release

A Release is the Paket's contract with its Konsumenten. Bump the version of `packages/brand`:

- **Major**: a Token or Asset removed or renamed (a renamed Farbrolle, for example), or a CSS variable name or export path changed. Confirm with the user before releasing.
- **Minor**: a Token or Asset added.
- **Patch**: a Farbwert or other value changed.

Steps: add the entry to `packages/brand/CHANGELOG.md` (rendered as Änderungen), bump the version with `TODO: exact version command`, tag `vX.Y.Z` on `main` after the release merge, push the tag. Then the portfolio raises the tag in its `@alex-schwaiger/brand` dependency, in its own PR.

## Git & PR workflow

`main` is production and only receives merges from `development`. `development` is the integration branch. Code work happens on `feat/*` branches, one per topic, each opening a PR into `development`. Tina commits content straight to `development`; it goes live with the next merge into `main`. Before pushing, run `pnpm typecheck` and `pnpm lint`.

## Agent skills

This repo uses its own lightweight setup instead of the `engineering-human` profile: concept in `docs/concept.md`, ADRs in `docs/adr/`, issues on GitHub. Tracker commands → `docs/agents/issue-tracker.md`; triage labels → `docs/agents/triage-labels.md`; how to read glossary and ADRs → `docs/agents/domain.md`.

## Hosting

Deploys, Dokploy, the subdomain `brand.alexanderschwaiger.at`, DNS and secrets → `docs/hosting.md` (TODO: file does not exist yet). The Docker image targets `linux/arm64`.
