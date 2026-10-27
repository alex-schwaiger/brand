# 0002 Das Portfolio bezieht das Paket per Git-Tag aus einem öffentlichen Repo

**Kontext:** Das Portfolio wird in Docker gebaut und muss das Paket dabei installieren. Brand- und Portfolio-Repo waren beide privat.

**Entscheidung:** Konsumenten installieren `github:alex-schwaiger/brand#vX.Y.Z&path:/packages/brand`. Das Brand-Repo wird öffentlich, damit der Build keine Zugangsdaten braucht. Der Tag wird von Hand erhöht.

**Verworfen:**
- *GitHub Packages (npm-Registry):* Auch für öffentliche Pakete braucht die Installation dort ein Token, und es kommt ein zusätzlicher Publish-Schritt dazu.
- *Privates Repo mit Read-Token als BuildKit-Secret:* Jeder Konsumenten-Build bräuchte ein Secret, nur um Werte zu schützen, die auf der Brand-Seite ohnehin öffentlich sind.
- *Renovate/Dependabot für Updates:* Bei einem Konsumenten und seltenen Releases zu viel Aufwand.

**Konsequenzen:** Im Repo darf nichts liegen, was nicht öffentlich sein darf, insbesondere keine Switzer-Dateien (siehe 0003). Ein Release ist ein Git-Tag. Ohne öffentliches Repo funktioniert der Bezug nicht.
