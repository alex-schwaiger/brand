# 0004 Next-Server-Container mit selbst gehostetem Tina

**Kontext:** Die Brand-Seite soll im Browser bearbeitbar sein. Das Portfolio läuft bereits als Container über GHCR und Dokploy auf dem eigenen Server.

**Entscheidung:** Die Brand-Seite läuft als Next-Server-Container auf demselben Server. Das Tina-Backend ist selbst gehostet: ein eigener Mongo-Container und ein GitHub-Provider mit einem Fine-grained Token, der nur dieses Repo beschreiben darf. Speichern erzeugt einen Commit auf `development`; live geht er mit dem nächsten Merge nach `main`, der den Redeploy auslöst. Die Mongo bekommt ein persistentes Volume, aber kein Backup.

**Verworfen:**
- *Statischer Export mit Tina Cloud:* kein Node-Prozess nötig, aber das Bearbeiten hängt an einem externen Dienst.
- *Statischer Export, Tina nur lokal:* Bearbeiten im Browser wäre dann nicht möglich.
- *Vercel / Cloudflare Pages:* Die Infrastruktur läge an zwei Orten, und Vercel Hobby verbietet kommerzielle Nutzung.

**Konsequenzen:** Ein dauerhaft laufender Node-Prozess und eine Mongo für eine selten geänderte Seite. Textänderungen sind erst nach dem Merge nach `main` und dem Redeploy sichtbar. Fällt die Mongo aus, werden Index und Benutzer neu erzeugt, denn die Inhalte liegen in Git.
