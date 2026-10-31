import { uiText } from '@/lib/ui-text'
import { Musterliste } from './Musterliste'

// Die Schriftstufen sind noch keine Tokens (Konzept Q31); bis zum Minor-Release stehen die Werte hier
const stufen = [
  { name: 'text-5xl', size: 48, usage: 'Abschnittsüberschriften' },
  { name: 'text-3xl', size: 30, usage: 'Kartentitel, Zwischenüberschriften' },
  { name: 'text-xl', size: 20, usage: 'Einleitung, Aufzählungen' },
  { name: 'text-base', size: 15, usage: 'Fließtext, Navigationslinks' },
  { name: 'text-sm', size: 13, usage: 'Kartenbeschreibungen' },
  { name: 'text-xs', size: 11, usage: 'Labels, Zeitangaben, Metadaten' },
]

export function Schriftstufen() {
  return (
    <Musterliste
      zeilen={stufen.map(({ name, size, usage }) => ({
        key: name,
        // Die größte Stufe passt mobil nur mit dem Nachnamen in die Spalte
        muster:
          size >= 48 ? (
            <>
              <span className='hidden sm:inline'>Alexander </span>Schwaiger
            </>
          ) : (
            'Alexander Schwaiger'
          ),
        stil: { fontSize: size, fontWeight: 400 },
        name: usage,
        werte: [
          { label: uiText.tailwind, wert: name },
          { label: uiText.groesse, wert: `${size}px` },
        ],
      }))}
    />
  )
}
