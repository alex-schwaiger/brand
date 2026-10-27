# 0003 Keine Schriftdateien im Paket und im Repo

**Kontext:** Switzer steht unter der ITF Free Font License 2.0. Selbst hosten ist erlaubt. Weitergabe über ein „repository“, einen „download service“ oder „publicly accessible servers“ ist verboten (§02), Subsetting und Formatkonvertierung ebenso. Geist Mono steht unter der OFL 1.1 und darf weitergegeben werden.

**Entscheidung:** Das Paket liefert nur Schriftfamilien und Fallback-Stacks, keine Schriftdateien, auch nicht Geist Mono. Die Brand-Seite lädt Switzer zur Build-Zeit aus dem offiziellen Fontshare-Zip und prüft dabei eine Prüfsumme. Jeder Konsument hostet seine Schriftdateien selbst. Dritte werden auf fontshare.com verwiesen.

**Verworfen:**
- *Geist Mono im Paket mitliefern:* erlaubt, aber dann bräuchte es eine Sonderregel pro Schrift.
- *Switzer über das Fontshare-CDN laden:* fremder Schrift-Host, widerspricht dem Self-Hosting im Portfolio.
- *Switzer in einem privaten Repo oder Submodul:* widerspricht dem öffentlichen Repo (0002) und verkompliziert jeden Build.

**Konsequenzen:** Konsumenten brauchen einen eigenen Weg zu den Schriftdateien. Der Build der Brand-Seite hängt von der Erreichbarkeit der Fontshare-URL ab. Als Rückfall dient ein privater S3-Bucket.
