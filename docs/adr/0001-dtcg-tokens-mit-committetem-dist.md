# Tokens als DTCG-JSON, generiertes `dist/` wird committet

Die Tokens liegen als DTCG-JSON in `packages/brand/tokens/`. Ein Build erzeugt daraus `dist/theme.css` (Tailwind-v4-`@theme`) und `dist/tokens` (Hex-Werte für React Email und JS). Nur so kommen CSS-Variablen und mailtaugliche Hex-Werte aus einer Quelle, und die Brand-Seite rendert ihre Farbtafeln aus derselben Datei. `dist/` wird committet, weil pnpm bei Git-Tag-Dependencies mit `path:` keinen verlässlichen Build ausführt (`prepare` ist langsam und bricht im Docker-Build). Ein CI-Check stellt sicher, dass `dist/` zur Quelle passt.
