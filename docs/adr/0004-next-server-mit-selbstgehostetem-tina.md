# Next-Server-Container mit selbst gehostetem Tina statt statischem Export

Die Brand-Seite läuft als Next-Server-Container (GHCR + Dokploy, wie das Portfolio) statt als statischer Export, damit das Tina-Backend selbst gehostet werden kann: eigener Mongo-Container, GitHub-Provider mit Fine-grained Token, Bearbeitung im Browser ohne Tina Cloud. Der Preis ist ein dauerhaft laufender Node-Prozess und eine Mongo für eine Seite, die sich selten ändert. Die Mongo bekommt ein persistentes Volume, aber kein Backup: Inhalte liegen in Git, Index und Benutzer lassen sich neu erzeugen.
