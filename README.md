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
