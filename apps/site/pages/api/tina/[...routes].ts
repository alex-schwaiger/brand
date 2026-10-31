import { LocalBackendAuthProvider, TinaNodeBackend } from '@tinacms/datalayer'
import { placeholderAuthProvider } from '../../../lib/tina-auth'
import databaseClient from '../../../tina/__generated__/databaseClient'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

// Tina erwartet einen Node-Handler (req, res); daher Pages-API statt App-Router-Route.
export default TinaNodeBackend({
  authProvider: isLocal ? LocalBackendAuthProvider() : placeholderAuthProvider,
  databaseClient,
})
