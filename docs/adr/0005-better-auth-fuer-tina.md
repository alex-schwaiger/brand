# 0005 Better Auth für den Tina-Login

**Kontext:** Das selbst gehostete Tina braucht einen Login. Der Standard `tinacms-authjs` speichert Benutzer samt Passwort-Hash als Tina-Collection im Git-Repo. Das Repo ist öffentlich, und laut README gilt der Standard als „not production grade“.

**Entscheidung:** Better Auth sichert den Tina-Admin ab, angebunden über einen eigenen Tina-Auth-Provider und `isAuthorized` im Backend. Benutzer liegen in der Brand-Mongo, die Registrierung ist deaktiviert, der einzige Benutzer wird per Seed-Skript angelegt. Angemeldet wird primär per Passkey, als Rückfallweg per Passwort plus TOTP mit Backup-Codes.

**Verworfen:**
- *GitHub-OAuth mit Allowlist:* bindet den Login an GitHub.
- *Passwort-Hash in einer Umgebungsvariable:* ohne zweiten Faktor, das Rate-Limit müsste man selbst bauen.
- *Clerk:* externer SaaS-Dienst.
- *Forward-Auth am Proxy (Authelia):* Ein eigener Dienst nur für einen einzigen Benutzer.

**Konsequenzen:** Ca. 100 Zeilen eigener Verbindungscode ohne offizielle Tina-Integration, der bei Tina-Updates brechen kann. Die Mongo hält jetzt Benutzer und Passkeys. Bei einem Verlust werden sie neu angelegt (siehe 0004).
