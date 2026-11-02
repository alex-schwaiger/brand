# Änderungen

## 1.1.0

### Neu

- **Logo-Datei** (`assets/`): `logo-black.svg`, die einfarbige Variante des Signets für Schwarz-Weiß-Druck, Stempel und Prägung.

### Geändert

- **Farbrolle `online`**: `#22c55e` → `#16a34a`. Der Akzentpunkt erreicht damit 3,3:1 auf Canvas und besteht WCAG 1.4.11.
- **Farbrolle `error`**: `#e85346` → `#c8382b`. Fehlertext erreicht damit 5,2:1 auf Canvas und besteht WCAG 1.4.3.
- **`logo-darkblue.svg`**: Füllfarbe von `#13273e` auf den Farbwert von `ink` (`#13273f`) korrigiert.

## 1.0.0

Erstes Release des Pakets.

### Neu

- **Farbrollen** (`--color-*`): `ink`, `body`, `canvas`, `muted`, `subtle`, `online`, `border`, `error`, `placeholder`, `sand`
- **Schriften** (`--font-*`, nur Familiennamen): `display`, `body`, `mono`
- **Radien** (`--radius`, `--radius-*`): `DEFAULT`, `sm`
- **Laufweiten** (`--tracking-*`): `display`, `label`, `nav`
- **Logo-Dateien** (`assets/`): `logo-darkblue.svg`, `logo-white.svg`
- **Exporte**: `@alex-schwaiger/brand/theme.css`, `@alex-schwaiger/brand/tokens`, `@alex-schwaiger/brand/assets/*`
