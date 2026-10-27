# 0001 Tokens als JSON, `theme.css` wird generiert und nie von Hand bearbeitet

**Kontext:** Die Tokens werden in zwei Formen gebraucht: als CSS-Variablen für Tailwind v4 und als Hex-Werte für React Email, das keine CSS-Variablen versteht. Die Brand-Seite soll Farbtafeln und Typo-Proben aus denselben Werten rendern.

**Entscheidung:** Einzige Quelle ist DTCG-JSON (W3C Design Tokens Format) in `packages/brand/tokens/`. Ein Build erzeugt `dist/theme.css` (Tailwind-`@theme`) und `dist/tokens` (JS + Typen). Alles in `dist/` wird nie von Hand bearbeitet. `dist/` wird committet, ein CI-Check scheitert, wenn es nicht zur Quelle passt.

**Verworfen:**
- *Handgeschriebenes `theme.css` als Quelle:* Die Hex-Werte für Mails müssten parallel gepflegt werden.
- *TypeScript-Objekt als Quelle:* Kein Standardformat. Agents und Werkzeuge außerhalb von JS können es schlechter lesen.
- *`dist/` nicht committen, sondern über `prepare` bauen:* pnpm baut bei Git-Tag-Dependencies mit `path:` nicht verlässlich, und im Docker-Build bricht es.

**Konsequenzen:** Jede Token-Änderung braucht einen Build-Lauf vor dem Commit. Generierte Dateien stehen im Diff. Der Werkzeug-Build (z. B. Style Dictionary) ist eine Entwicklungsabhängigkeit des Pakets.
