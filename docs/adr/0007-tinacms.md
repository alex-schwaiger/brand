# 0007 TinaCMS als Git-basiertes CMS statt Payload oder Sanity

**Kontext:** Die Texte der Brand-Seite sollen im Browser bearbeitbar sein. Gleichzeitig sollen sie neben den Tokens versioniert und für Agents lesbar bleiben.

**Entscheidung:** TinaCMS bearbeitet die MDX-Dateien der Fumadocs-Seite und committet jede Änderung ins Repo. Die Mongo des selbst gehosteten Tina (0004) hält nur einen Index und den Login, nicht die Inhalte.

**Verworfen:**
- *Payload (wie im Portfolio):* Die Inhalte lägen in der Datenbank, nicht in Git neben den Tokens. Sie wären damit nicht mit den Releases versioniert und nicht als MDX für Agents lesbar.
- *Sanity:* externer SaaS-Dienst, die Inhalte lägen außerhalb des Repos.

**Konsequenzen:** Inhalte sind MDX im Repo, und jede Bearbeitung ist ein Commit. Eigene MDX-Bausteine müssen als Tina-Templates registriert werden. Ein zweites CMS neben Payload muss gepflegt werden.
