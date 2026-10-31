import { LocalBackendAuthProvider, TinaNodeBackend } from '@tinacms/datalayer'
import { isLocalMode } from '../../../lib/auth'
import { betterAuthBackend } from '../../../lib/tina-auth'
import databaseClient from '../../../tina/__generated__/databaseClient'

// Tina erwartet einen Node-Handler (req, res); daher Pages-API statt App-Router-Route.
export default TinaNodeBackend({
  authProvider: isLocalMode ? LocalBackendAuthProvider() : betterAuthBackend,
  databaseClient,
})
