# Payload Better Auth Cloudflare Neon

This repo is a working example of how to use [Payload](https://payloadcms.com/) with [Better Auth](https://better-auth.com/) via [Payload Auth](https://github.com/payload-auth/payload-auth) for authentication, [Neon Postgres](https://neon.com) for the database, and [Cloudflare Workers](https://www.cloudflare.com/developer-platform/products/workers/) for the hosting.

Note: You need to have a paid Cloudflare account ($5/month) to deploy this project to production. However, you can run a local preview however you like.

You need to have a [Neon Postgres database](https://neon.com) to use this project.

# Development

## 1. Install Dependencies

```bash
pnpm install
```

### 1.1 Environment variables

```bash
cp .env.example .env
```

Then fill in the the correct values for your environment.

```bash
DATABASE_URI='postgresql://neon-db-user:neon-db-password@neon-db-host/neondb?sslmode=require&channel_binding=require'

PAYLOAD_SECRET='you may generate using openssl rand -hex 16'

BETTER_AUTH_SECRET='you may generate using openssl rand -base64 32'
```

## 2. Run the Development Server

```bash
pnpm dev
```

## 3. Run local preview

```bash
pnpm preview
```

# Deployment

## 1. Deploy to Cloudflare Workers via Github integration

After connecting your Github repository to Cloudflare Workers, you can select the project for deployment on Cloudflare Dashboard.

### Build command

```
pnpm run build:opennextjs
```

### Variables and Secrets

```bash
DATABASE_URI # Neon Postgres database URI
PAYLOAD_SECRET # Payload secret
BETTER_AUTH_SECRET # Better Auth secret
```

Make sure you set `keep_vars = true` in your `wrangler.toml` file to ensure the environment variables and secrets won't be lost after you deploy from wrangler CLI.

```toml
name = "payload-better-auth-cloudflare-neon"
main = ".open-next/worker.js"
compatibility_date = "2025-10-25"
compatibility_flags = ["nodejs_compat", "global_fetch_strictly_public"]
keep_vars = true

[observability]
enabled = true

[assets]
binding = "ASSETS"
directory = ".open-next/assets"
```

# Important Notes

## Next config

You must add `pg-cloudflare` to the `serverExternalPackages` in your `next.config.mjs` file to ensure we have the correct variant of the `pg` package for Cloudflare Workers.

```ts
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  serverExternalPackages: ['pg-cloudflare'],
}

export default withPayload(nextConfig, { devBundleServerPackages: false })

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
initOpenNextCloudflareForDev()
```

## Postgres adapter config in `payload.config.ts`

You must set `maxUses` to `1` so connection is not reused between requests.

```ts
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
      maxUses: 1,
    },
    push: false,
  }),
  plugins: [betterAuthPlugin(betterAuthPluginOptions)],
})
```

Only use `push: true` or omit it entirely if you're sure that you're not using proudction database.

## Performance

Consider [Hyperdrive](https://developers.cloudflare.com/hyperdrive) for performance optimizations.
