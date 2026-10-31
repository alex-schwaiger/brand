# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primär:** Alexander Schwaiger selbst und seine KI-Agents. Beide schlagen Regeln, Tokens und Logo nach, während sie an einem anderen Projekt arbeiten (Portfolio, Mails, später Print und weitere Apps). Agents lesen dabei `/llms.txt`, `/llms-full.txt`, die `.mdx`-Rohansichten und `/tokens.json`.
- **Sekundär:** Kunden und Recruiter, als Nebeneffekt einer sauber strukturierten Referenz.
- **Nicht im Fokus:** externe Partner wie Druckereien, Agenturen oder Presse. Kein Download-Center, bis ein echter Bedarf auftaucht.

## Product Purpose

Die Brand-Seite `brand.alexanderschwaiger.at` ist die verbindliche Quelle der Personenmarke „Alexander Schwaiger“. Sie dokumentiert die Grundlagen der Marke (Logo, Farben, Typografie, Abstände & Form, Prinzipien, Tonalität) und die Änderungen am Paket `@alex-schwaiger/brand`. Erfolg heißt: Jedes Projekt bezieht die Marke von hier, niemand hardcodet einen Wert, und ein Agent findet jede Regel ohne Rückfrage.

## Positioning

Die Seite ist kein Styleguide neben dem Code, sondern Teil davon. Regeln, Tokens und Assets liegen im selben Repo wie das Paket, das die Konsumenten einbinden. Die Werte auf der Seite werden aus dem Paket gerendert und können deshalb nicht vom Code abweichen. Alles ist für Menschen und für Agents gleichermaßen lesbar.

## Operating Context

- Nachschlagen während der Arbeit an einem Konsumenten, oft parallel zu Editor und Terminal.
- Agents holen die Markenregeln über `llms-full.txt` und die Tokens über das Paket oder `/tokens.json`.
- Tokens ändern sich nur per Code-Commit in `packages/brand/tokens/`, mit Release nach SemVer und Eintrag auf der Seite „Änderungen“. Texte pflegt Alexander über TinaCMS, das direkt auf `development` committet.
- Konsumenten heben den Git-Tag des Pakets manuell, nachdem sie „Änderungen“ geprüft haben.

## Capabilities and Constraints

- Fumadocs auf Next.js mit selbst gehostetem TinaCMS (ADR 0004, 0007). Login über Better Auth (ADR 0005).
- Öffentlich und indexierbar, nur auf Deutsch, kein i18n, genau eine Marke.
- Texte liegen im Tina-verwalteten MDX unter `content/docs/`. Komponenten rendern sie und enthalten selbst keinen Text. Werte in den Token-Bausteinen kommen aus dem Paket, nie aus Tina.
- Font-Dateien liegen nicht im Repo und nicht im Paket (ADR 0003). Das Paket liefert nur Familiennamen.
- Die Schriftstufen gehören zur Marke, sind aber noch keine Tokens. Sie kommen in einem späteren Minor-Release ins Paket.
- Beschlossen: CMYK-Werte (PSO Coated v3) kommen als `$extensions` an den Farb-Tokens in einem Minor-Release ins Paket. Bis zu einem Proof gelten sie als vorläufig.
- Offen: Dark Mode. Er folgt erst, wenn das Paket Dark-Tokens hat.
- Docker-Image für `linux/arm64`, Deploy über Dokploy.

## Brand Commitments

- Die Seite trägt die Marke, die sie dokumentiert. Sie bezieht Tokens und Assets aus dem eigenen Paket und definiert keine eigenen Markenwerte.
- Begriffe nach `GLOSSARY.md` (Marke, Wortmarke, Farbrolle, Farbwert, Schriftstufe, Grundlagen, Paket, Token, Konsument, Release, Änderungen).
- Tonalität nach der Seite „Tonalität“: Ich-Form, Leserinnen und Leser werden gesiezt, kurze ruhige Sätze, keine Gedankenstriche.

## Evidence on Hand

- Wortmarke als SVG: `packages/brand/assets/logo-darkblue.svg`, `logo-white.svg`.
- Tokens: `packages/brand/tokens/*.json` (DTCG), Version 1.0.0.
- Inhalte der Grundlagen: `content/docs/*.mdx`, übernommen aus `DESIGN.md` und `COPY.md` des Portfolios.
- `packages/brand/CHANGELOG.md` als Quelle für „Änderungen“.
- Nicht vorhanden und nicht zu erfinden: Kundenstimmen, Fallstudien, Druck-Proofs, Dark-Tokens, weitere Logo-Varianten (Bildmarke, Favicon-Set).

## Product Principles

1. Eine Quelle: Jeder Wert kommt aus dem Paket. Was die Seite zeigt, ist was Konsumenten bekommen.
2. Nachschlagen vor Erzählen: Eine Regel ist in Sekunden gefunden und kopierbar, für Menschen wie für Agents.
3. Die Seite lebt die Marke vor. Sie bricht keine Regel, die sie dokumentiert.
4. Änderungen sind nachvollziehbar: Jede Änderung am Paket steht mit Version auf „Änderungen“.

## Accessibility & Inclusion

WCAG 2.2 AA für alle Flächen, auch für halbtransparente. Sichtbare Fokuszustände, ausreichender Kontrast und `prefers-reduced-motion` werden respektiert.
