# Konzept: Brand-Seite brand.alexanderschwaiger.at

Dieses Dokument hält fest, was die Brand-Seite und das Paket `@alex-schwaiger/brand` sind, für wen sie gebaut werden und wie Tokens von hier in die Projekte fließen. Es ist das Ergebnis des Grillings vom 2026-10-27 (Entscheidungen Q1–Q30 unten) und die Grundlage für die Issues. Begriffe stehen in [`GLOSSARY.md`](../GLOSSARY.md), die tragenden Entscheidungen als ADRs in [`docs/adr/`](adr/).

## 1. Zielgruppe

- **Primär:** Alexander selbst und seine KI-Agents. Die Seite ist die verbindliche Quelle der Marke, aus der jedes Projekt (Portfolio, Mails, später Print und weitere Apps) die Marke bezieht.
- **Sekundär:** Kunden und Recruiter, als Nebeneffekt einer gut strukturierten Referenzdoku.
- **Nicht im Fokus:** externe Partner (Druckereien, Agenturen, Presse). Kein Download-Center, bis ein echter Bedarf auftaucht.

Die Seite ist öffentlich und indexierbar, nur auf Deutsch (kein i18n) und dokumentiert genau eine Marke: die Personenmarke „Alexander Schwaiger“.

## 2. Umfang v1

Die erste Version umfasst nur die **Grundlagen**:

| Seite | Inhalt |
|---|---|
| Logo | Wortmarke dunkelblau und negativ (weiß), Schutzzone, Mindestgröße, zulässige Hintergründe |
| Farben | alle Farb-Tokens, aus dem Paket gerendert |
| Typografie | Switzer und Geist Mono, Gewichte, Tracking; Bezugsquelle Switzer: Link auf Fontshare |
| Abstände & Form | Radius (scharfkantig, `0`), Tracking-Tokens |
| Prinzipien | Brutally Minimal / Editorial, null Radius, Klammern `[ ]` als einziges Dekor |
| Tonalität | markenweite Teile aus `COPY.md` des Portfolios |
| Änderungen | `packages/brand/CHANGELOG.md`, gerendert |

**Später (nicht v1):** Anwendungen wie Mail-Templates, Signatur, OG-Bilder, Social, Print; weitere Logo-Varianten (Bildmarke, Favicon-Set).

**Herkunft der Inhalte:** Die markenweiten Teile von `DESIGN.md` (Ästhetik, Typo, Farben, Prinzipien) und `COPY.md` (Tonalität) des Portfolios ziehen hierher und sind ab dann nur noch hier gepflegt. Im Portfolio bleibt nur Portfolio-Spezifisches (z. B. die `text-hero`-Skala, Seitenlayouts, konkrete Texte) plus ein Verweis auf die Brand-Seite.

**Für Agents:** Die Seite liefert `/llms.txt`, `/llms-full.txt`, `.mdx`-Rohansichten pro Seite und `/tokens.json` (die DTCG-Quelle der deployten Version). Die `CLAUDE.md` bzw. `DESIGN.md` des Portfolios verweist darauf: „Markenregeln: brand.alexanderschwaiger.at/llms-full.txt; Tokens kommen aus `@alex-schwaiger/brand`, nie hardcoden.“

## 3. Repo und Paket

Öffentliches Repo `alex-schwaiger/brand` als pnpm-Workspace:

```
/
├── apps/site/          Fumadocs + TinaCMS (Next.js), die Brand-Seite
└── packages/brand/     @alex-schwaiger/brand
    ├── tokens/         DTCG-JSON (Quelle)
    ├── assets/         Logo-SVGs
    ├── dist/           generiert und committet
    └── CHANGELOG.md
```

**Paketinhalt:** Tokens und Logo-SVGs. **Keine Font-Dateien**, auch nicht Geist Mono; das Paket exportiert nur Familiennamen und Fallback-Stacks. Jeder Konsument hostet die Font-Dateien selbst ([ADR-0003](adr/0003-keine-fonts-im-paket.md)).

**Tokens:** eine einzige semantische Ebene, die Namen 1:1 aus dem heutigen Portfolio-`@theme` (keine Primitive-Ebene, bis Dark Mode oder eine zweite Marke kommt):

| Gruppe | Tokens (v1.0.0, Werte aus `Portfolio/src/app/(frontend)/styles.css`) |
|---|---|
| Farben | `ink` #13273f, `body` #2d2d2d, `canvas` #ffffff, `muted` #6b7280, `subtle` #f4f5f7, `online` #22c55e, `border` #e8e9eb, `error` #e85346, `placeholder` #d9d9d9, `sand` #dcd5cd |
| Fonts | `display` "Switzer", sans-serif; `body` "Switzer", sans-serif; `mono` "Geist Mono", monospace |
| Tracking | `display` -0.03em, `label` 0.08em, `nav` 0.04em |
| Radius | `radius` 0px, `radius-sm` 2px |

**Build:** Aus der DTCG-JSON erzeugt ein Build (z. B. Style Dictionary) `dist/theme.css` (Tailwind-v4-`@theme`, Variablennamen wie heute: `--color-ink`, `--font-display`, `--tracking-label`, `--radius` …) und `dist/tokens` (JS + `.d.ts` mit Hex-Werten, u. a. für React Email). `dist/` wird committet; ein CI-Check schlägt fehl, wenn `dist/` nicht zur Quelle passt ([ADR-0001](adr/0001-dtcg-tokens-mit-committetem-dist.md)).

## 4. Token-Ablauf

1. Token ändern: nur per Code-Commit in `packages/brand/tokens/`, nie über Tina.
2. Build ausführen, `dist/` mitcommitten (CI prüft).
3. Release: SemVer, manuell mit `pnpm version` im Paket, Eintrag in `CHANGELOG.md`, Tag `vX.Y.Z`, Push.
   - **Major:** Token entfernt oder umbenannt.
   - **Minor:** Token neu.
   - **Patch:** Wert geändert.
4. Konsument (Portfolio) hebt den Tag manuell in seiner `package.json`:
   `"@alex-schwaiger/brand": "github:alex-schwaiger/brand#vX.Y.Z&path:/packages/brand"`
   Kein Renovate/Dependabot. Vorher die Seite „Änderungen“ prüfen.
5. Im Portfolio: `styles.css` importiert `@alex-schwaiger/brand/theme.css` statt des Markenteils von `@theme`; `src/emails/` nutzt die exportierten Hex-Werte.

Die Brand-Seite selbst deployt unabhängig von Releases bei jedem Push auf `main`. Sie liest die Tokens aus dem Workspace-Paket und rendert Farbtafeln, Typo-Proben und Logo-Nutzung daraus.

**v1.0.0** ist eine 1:1-Extraktion der heutigen Portfolio-Werte. Das Portfolio wird im selben Schritt umgestellt; sein Aussehen ändert sich nicht. Portfolio-spezifische Tokens (`text-hero`-Skala) bleiben lokal.

Bezug per Git-Tag ohne Registry funktioniert, weil das Repo öffentlich ist; der Docker-Build des Portfolios braucht keine Zugangsdaten ([ADR-0002](adr/0002-paketbezug-per-git-tag.md)).

## 5. Fonts

- **Switzer** (ITF Free Font License 2.0): Selbst hosten erlaubt, nur mit den **unveränderten** woff2 aus dem offiziellen Fontshare-Zip (kein Subsetting, keine Konvertierung). Weitergabe in einem öffentlichen Repo oder als Download ist **verboten**.
  - Brand-Seite: Der Docker-Build lädt das offizielle Zip, prüft eine hinterlegte Prüfsumme und kopiert die woff2-Dateien. Lokal erledigt das ein Skript; die Dateien stehen in `.gitignore`. Fallback, falls die Fontshare-URL instabil wird: privater S3-Bucket.
  - Portfolio: Die drei Dateien in `public/fonts/switzer/` weichen vom offiziellen Zip ab (Hash und Größe) und werden bei der Migration durch die Originale (Regular, Medium, Bold, nur umbenannt) ersetzt.
  - Die Brand-Seite verlinkt für Dritte auf https://www.fontshare.com/fonts/switzer.
- **Geist Mono** (SIL OFL 1.1): uneingeschränkt nutzbar; bei Weitergabe `OFL.txt` und Copyright-Hinweis mitliefern. Trotzdem nicht im Paket (einheitliche Regel).

## 6. Brand-Seite: Look, Hosting, CMS

**Look:** Das Fumadocs-UI nutzt die eigenen Tokens (`--color-fd-*` auf `ink`, `canvas`, `border` …), Switzer und Geist Mono, Radius `0`. Die Seite ist damit der zweite echte Konsument des Pakets.

**Hosting:** Next-Server-Container auf demselben Server wie das Portfolio. Eine GitHub Action baut das Image bei jedem Push auf `main`, pusht nach GHCR, Dokploy rollt aus (Domain und Traefik-Labels setzt Dokploy). ([ADR-0004](adr/0004-next-server-mit-selbstgehostetem-tina.md))

**TinaCMS, selbst gehostet:**
- Eigener Mongo-Container im Brand-Compose (nicht die Portfolio-Mongo), persistentes externes Volume `brand_mongo_data`, **kein Backup**: Bei Totalverlust Tina-Index aus Git neu aufbauen, Seed-Skript ausführen, Passkey neu registrieren.
- Git-Provider GitHub mit Fine-grained Token, nur `contents: write` auf `alex-schwaiger/brand`.
- Speichern in Tina erzeugt einen Commit direkt auf `main` → Deploy-Workflow → sichtbar nach einigen Minuten (Fumadocs kompiliert MDX zur Build-Zeit). Keine Branches oder PRs für Doku-Texte.
- Tina bearbeitet nur MDX-Texte. Die Token-Bausteine (`<ColorPalette />`, `<TypeScale />`, `<LogoUsage />` …) sind als Tina-MDX-Templates **ohne Felder** registriert: einfügbar, aber nicht editierbar.
- Lokal: `tinacms dev` im Local Mode, ohne Auth und ohne Mongo, schreibt direkt ins Dateisystem. Die Auth-Strecke wird nur gegen einen lokalen Docker-Compose-Stack getestet.

**Login (Better Auth)** ([ADR-0005](adr/0005-better-auth-fuer-tina.md)):
- Better Auth, angebunden über einen eigenen Tina-Auth-Provider (Client) und `isAuthorized` (Backend, `/api/tina/*`) mit `auth.api.getSession({ headers })`.
- Benutzer und Sessions in der Brand-Mongo (MongoDB-Adapter). Registrierung deaktiviert (`disableSignUp`); der einzige Benutzer wird per Seed-Skript angelegt.
- Primär **Passkey** (gebunden an `brand.alexanderschwaiger.at`, nur Produktion); Rückfallweg **Passwort + TOTP** mit Backup-Codes. Eingebautes Rate-Limit aktiv.
- Kein Passwort und keine Benutzerdatei im Repo (der Standard-Weg von `tinacms-authjs` würde Hashes im öffentlichen Repo ablegen und ist laut README „not production grade“).

## 7. Entscheidungen aus dem Grilling

| # | Frage | Entscheidung |
|---|---|---|
| Q1 | Zielgruppe | Primär Alexander + Agents, Schaufenster als Nebeneffekt |
| Q2 | Sichtbarkeit | Öffentlich, indexierbar |
| Q3 | Marken | Nur eine Marke |
| Q4 | Token-Format | DTCG-JSON + Build zu CSS und TS |
| Q5 | Repo-Layout | pnpm-Workspace `apps/site` + `packages/brand` |
| Q6 | Sprache | Nur Deutsch |
| Q7 | Repo-Sichtbarkeit | Repo öffentlich, Switzer nicht im Repo |
| Q8 | Umfang v1 | Grundlagen + Tonalität, Anwendungen später |
| Q9 | DESIGN.md/COPY.md | Markenweite Teile ziehen auf die Brand-Seite |
| Q10 | Token-Namen | Einstufig, heutige Namen 1:1 |
| Q11 | Build-Output | `dist/` committet, CI-Check |
| Q12 | Versionierung | SemVer, Tags `vX.Y.Z`, manuell, Changelog |
| Q13 | Tokens in Tina | Nein, nur per Code |
| Q14 | Hosting | Next-Server-Container, GHCR + Dokploy |
| Q15 | Tina-Backend | Selbst gehostet, eigene Mongo, GitHub-Provider |
| Q16 | Ablauf nach Bearbeitung | Commit auf `main` → Redeploy |
| Q17 | Fonts im Paket | Keine Font-Dateien |
| Q18 | Switzer für die Seite | Fontshare-Zip im Build, Prüfsumme |
| Q19 | Switzer im Portfolio | Durch Originaldateien ersetzen |
| Q20 | Logo | Dunkelblau + Negativ im Paket, Nutzungsregeln auf der Seite |
| Q21 | Paket-Updates | Manuell, kein Bot |
| Q22 | v1.0.0 | 1:1-Extraktion, Portfolio im selben Schritt umgestellt |
| Q23 | Look der Seite | Eigene Tokens im Fumadocs-UI |
| Q24 | Tina-Login | Better Auth |
| Q25 | Agent-Ausgaben | llms.txt, llms-full.txt, .mdx, tokens.json, Verweis im Portfolio |
| Q26 | Changelog | Eigene Seite „Änderungen“ |
| Q27 | Token-Bausteine | Tina-Templates ohne Felder |
| Q28 | Anmeldemethoden | Passkey, Rückfall Passwort + TOTP + Backup-Codes |
| Q29 | Mongo-Backup | Persistentes Volume, kein Backup |
| Q30 | Lokale Entwicklung | Tina Local Mode ohne Auth |
