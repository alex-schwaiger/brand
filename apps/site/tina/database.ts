import { createDatabase, createLocalDatabase } from '@tinacms/datalayer'
import { MongodbLevel } from 'mongodb-level'
import { GitHubProvider } from 'tinacms-gitprovider-github'

// Konzept §6, ADR-0004: Tina-Index in der Brand-Mongo, Speichern wird ein Commit auf `development`.
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Umgebungsvariable ${name} fehlt`)
  return value
}

const branch = process.env.GITHUB_BRANCH ?? 'development'

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        owner: process.env.GITHUB_OWNER ?? 'alex-schwaiger',
        repo: process.env.GITHUB_REPO ?? 'brand',
        branch,
        token: required('GITHUB_TOKEN'),
        // Das Repo ist ein Monorepo; Tina arbeitet relativ zu apps/site
        rootPath: 'apps/site',
      }),
      databaseAdapter: new MongodbLevel<string, Record<string, unknown>>({
        collectionName: 'tinacms',
        dbName: 'tinacms',
        mongoUri: required('MONGODB_URI'),
      }),
      namespace: branch,
    })
