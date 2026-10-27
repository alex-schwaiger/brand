# @alex-schwaiger/brand

Tokens und Assets der Marke Alexander Schwaiger. Die Tokens stehen als DTCG-JSON in `tokens/`; `dist/` ist generiert.

## Einbinden

```bash
pnpm add "github:alex-schwaiger/brand#vX.Y.Z&path:/packages/brand"
```

```css
@import "@alex-schwaiger/brand/theme.css";
```

## Release-Ablauf

Ein Release ist der Vertrag des Pakets mit seinen Konsumenten. Die Version richtet sich nach der Änderung:

| Stufe | Wann |
| --- | --- |
| Major | Token oder Asset entfernt oder umbenannt, CSS-Variablenname oder Export-Pfad geändert |
| Minor | Token oder Asset neu |
| Patch | Wert geändert (z. B. ein Farbwert) |

Ablauf:

1. Eintrag in `CHANGELOG.md` ergänzen.
2. Version in `packages/brand` anheben: `pnpm version <major|minor|patch> --no-git-tag-version`.
3. Per PR nach `development`, dann nach `main` mergen.
4. Auf `main` den Tag `vX.Y.Z` setzen und pushen: `git tag vX.Y.Z && git push origin vX.Y.Z`.
5. Im Portfolio den Tag in der Abhängigkeit `@alex-schwaiger/brand` anheben, in einem eigenen PR.

Ein Major-Release wird vorher bewusst bestätigt.
