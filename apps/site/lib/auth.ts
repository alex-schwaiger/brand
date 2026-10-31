import { passkey } from '@better-auth/passkey'
import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { twoFactor } from 'better-auth/plugins'
import { MongoClient } from 'mongodb'

// Tina-Login, Konzept §6 und ADR-0005. Keine relativen Imports: scripts/seed-user.ts lädt diese
// Datei direkt mit Node.

// Passkeys sind an die Produktions-Domain gebunden und funktionieren nur dort (Konzept §6).
const PASSKEY_RP_ID = 'brand.alexanderschwaiger.at'
const PASSKEY_ORIGIN = `https://${PASSKEY_RP_ID}`
const APP_NAME = 'Marke Alexander Schwaiger'

function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Umgebungsvariable ${name} fehlt`)
  return value
}

function createAuth(client: MongoClient) {
  return betterAuth({
    appName: APP_NAME,
    secret: required('BETTER_AUTH_SECRET'),
    baseURL: required('BETTER_AUTH_URL'),
    // Eigene Datenbank in der Brand-Mongo, getrennt vom Tina-Index (tina/database.ts).
    // Die Mongo läuft als Einzelserver ohne Replica Set, daher ohne Transaktionen.
    database: mongodbAdapter(client.db('auth'), { client, transaction: false }),
    emailAndPassword: {
      enabled: true,
      // Der einzige Benutzer entsteht per Seed-Skript (scripts/seed-user.ts)
      disableSignUp: true,
      minPasswordLength: 12,
    },
    rateLimit: {
      // Standardmäßig nur in Produktion aktiv; hier immer, damit der lokale Stack es zeigt.
      enabled: true,
      // Überlebt einen Neustart des Containers
      storage: 'database',
      customRules: {
        '/sign-in/*': { window: 300, max: 5 },
        '/two-factor/*': { window: 300, max: 5 },
      },
    },
    plugins: [
      twoFactor({ issuer: APP_NAME }),
      passkey({ rpID: PASSKEY_RP_ID, rpName: APP_NAME, origin: PASSKEY_ORIGIN }),
    ],
  })
}

type Auth = ReturnType<typeof createAuth>

let client: MongoClient | undefined
let auth: Auth | undefined

// Erst beim ersten Aufruf erzeugt: Beim Build und im Local Mode gibt es weder Mongo noch Secret.
export function getAuth(): Auth {
  if (!auth) {
    client = new MongoClient(required('MONGODB_URI'))
    auth = createAuth(client)
  }
  return auth
}

export async function closeAuth(): Promise<void> {
  await client?.close()
  client = undefined
  auth = undefined
}

export const isLocalMode = process.env.TINA_PUBLIC_IS_LOCAL === 'true'
