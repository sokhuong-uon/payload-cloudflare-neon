import { postgresAdapter } from '@payloadcms/db-postgres'
import { betterAuthPlugin } from 'payload-auth'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from '@/collections/users'
import { Todos } from '@/collections/todos'
import { betterAuthPluginOptions } from '@/features/auth/better-auth-plugin-options'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Todos],
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    idType: 'uuid',
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    push: false,
  }),
  plugins: [betterAuthPlugin(betterAuthPluginOptions)],
})
