# Brand

Die Personenmarke „Alexander Schwaiger“ und wie sie in seine Websites und Apps gelangt: als dokumentierte Regeln auf der Brand-Seite und als versioniertes Paket. Die Sprache der Brand-Seite ist Deutsch, daher sind die kanonischen Begriffe deutsch.

Begriffe aus dem Portfolio (**Projekt**, **Leistung**, **Auftraggeber** …) gelten hier unverändert und werden nicht neu definiert, siehe [Portfolio/GLOSSARY.md](https://github.com/alex-schwaiger/portfolio/blob/main/GLOSSARY.md).

## Marke

**Marke**:
Die Personenmarke „Alexander Schwaiger“, die einzige Marke, die hier festgelegt wird.
_Avoid_: CI, Corporate Identity, Corporate Design, Brand (im Fließtext)

**Wortmarke**:
Das Logo der Marke in Schriftform, in den Varianten dunkelblau und negativ.
_Avoid_: Logo-Schriftzug, Signet, Schriftzug

**Farbrolle**:
Der Zweck, für den eine Farbe der Marke steht, etwa „Ink“ für Überschriften und Akzente oder „Canvas“ für den Hintergrund. Konsumenten verwenden immer die Farbrolle, nie den Farbwert direkt.
_Avoid_: Farbe (ohne Zusatz), Farbname, Primärfarbe, Sekundärfarbe

**Farbwert**:
Der konkrete Farbton, der einer Farbrolle zugewiesen ist, etwa #13273f für Ink. Kann sich ändern, ohne dass sich die Farbrolle ändert.
_Avoid_: Farbcode, Hex, Farbe (ohne Zusatz)

**Schriftstufe**:
Eine benannte Schriftgröße mit festgelegter Verwendung, etwa die Stufe für Abschnittsüberschriften. Die Schriftstufen bilden zusammen die Typo-Skala der Marke; die Titelgröße auf der Startseite des Portfolios gehört nicht dazu.
_Avoid_: Schriftgrad, Textgröße, Font-Size, Größe (ohne Zusatz)

**Grundlagen**:
Die Kapitel der Brand-Seite, die die Marke selbst festlegen: Logo, Farben, Typografie, Abstände & Form, Prinzipien, Tonalität.
_Avoid_: Basics, Foundations, Basiselemente

**Anwendung**:
Eine konkrete Umsetzung der Marke in einem Medium, etwa eine Mail, die Signatur, ein Vorschaubild für soziale Medien oder Print. Eine Software, die das Paket nutzt, ist keine Anwendung, sondern ein Konsument.
_Avoid_: Template, Use Case, App (in diesem Sinn)

## Paket

**Paket**:
`@alex-schwaiger/brand`, das versionierte Bündel aus Tokens und Assets, das Konsumenten einbinden.
_Avoid_: Library, Bibliothek, Design-System-Paket

**Token**:
Ein benannter Markenwert, dessen einzige Quelle das Paket ist: eine Farbrolle mit ihrem Farbwert, eine Schriftfamilie, eine Laufweite oder ein Eckenradius.
_Avoid_: Variable, CSS-Variable, Design-Variable, Stilwert

**Asset**:
Eine Markendatei im Paket, die Konsumenten unverändert einbinden, etwa eine Variante der Wortmarke. Schriftdateien sind keine Assets der Marke.
_Avoid_: Download, Datei (ohne Zusatz), Ressource, Material

**Konsument**:
Eine Website oder App, die das Paket in einem bestimmten Release einbindet und ihre Markenwerte daraus bezieht; heute das Portfolio und die Brand-Seite selbst.
_Avoid_: Projekt (heißt im Portfolio eine Arbeit für einen Auftraggeber), Client, Abnehmer, Anwendung

**Release**:
Eine veröffentlichte, mit einer Versionsnummer gekennzeichnete Fassung des Pakets. Ein Konsument wechselt nur bewusst von einem Release zum nächsten.
_Avoid_: Deploy (das ist die Auslieferung der Brand-Seite), Update, Stand

## Brand-Seite

**Brand-Seite**:
Die öffentliche Dokumentation der Marke unter brand.alexanderschwaiger.at.
_Avoid_: Styleguide, Brand-Portal, CI-Handbuch, Markenhandbuch

**Änderungen**:
Die Liste aller Releases mit den Tokens und Assets, die jeweils neu sind, sich geändert haben oder entfernt wurden.
_Avoid_: Changelog (im Fließtext), Versionshistorie, Release Notes
