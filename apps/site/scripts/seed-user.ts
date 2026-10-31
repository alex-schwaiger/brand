// Legt den einzigen Benutzer für den Tina-Login an (ADR-0005), oder setzt sein Passwort neu,
// wenn es ihn schon gibt. Die Werte kommen aus der Umgebung, nie aus dem Repo:
//
//   SEED_USER_EMAIL=… SEED_USER_PASSWORD=… pnpm --filter site seed:user
//
// Braucht außerdem MONGODB_URI, BETTER_AUTH_SECRET und BETTER_AUTH_URL wie die laufende Seite.
// TOTP und Passkey richtet man danach unter /konto ein.
import { closeAuth, getAuth } from '../lib/auth.ts'

function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Umgebungsvariable ${name} fehlt`)
  return value
}

const email = required('SEED_USER_EMAIL').toLowerCase()
const password = required('SEED_USER_PASSWORD')
const name = process.env.SEED_USER_NAME ?? 'Alexander Schwaiger'

const ctx = await getAuth().$context
try {
  const { minPasswordLength, maxPasswordLength } = ctx.password.config
  if (password.length < minPasswordLength || password.length > maxPasswordLength) {
    throw new Error(`Das Passwort braucht ${minPasswordLength} bis ${maxPasswordLength} Zeichen`)
  }
  const hash = await ctx.password.hash(password)

  const existing = await ctx.internalAdapter.findUserByEmail(email)
  if (existing) {
    await ctx.internalAdapter.updatePassword(existing.user.id, hash)
    console.log(`Passwort für ${email} neu gesetzt.`)
  } else {
    const others = await ctx.internalAdapter.countTotalUsers()
    if (others > 0) throw new Error('Es gibt schon einen anderen Benutzer; abgebrochen')
    const user = await ctx.internalAdapter.createUser(
      { email, name, emailVerified: true },
      { method: 'admin' },
    )
    await ctx.internalAdapter.linkAccount({
      userId: user.id,
      providerId: 'credential',
      accountId: user.id,
      password: hash,
    })
    console.log(`Benutzer ${email} angelegt. Jetzt anmelden und unter /konto TOTP einrichten.`)
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
} finally {
  await closeAuth()
}
