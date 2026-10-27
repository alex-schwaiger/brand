# 0006 Eigenes Repo für Marke und Brand-Seite statt Monorepo mit dem Portfolio

**Kontext:** Das Paket und die Brand-Seite hätten auch als weitere Pakete im Portfolio-Repo leben können.

**Entscheidung:** Marke, Paket und Brand-Seite liegen im eigenen Repo `alex-schwaiger/brand`, einem pnpm-Workspace mit `apps/site` und `packages/brand`.

**Verworfen:**
- *Monorepo mit dem Portfolio:* Das Portfolio ist eine Payload-App mit eigenem Deploy und eigener CI. Ein gemeinsamer Workspace würde beide Builds und Releases koppeln. Die Marke soll ohne das Portfolio weiterleben und weitere Konsumenten bedienen.

**Konsequenzen:** Das Portfolio bezieht die Marke wie jeder andere Konsument über einen Release (0002). Eine Token-Änderung ist im Portfolio erst nach Release und Tag-Bump sichtbar, nicht sofort im selben Commit.
