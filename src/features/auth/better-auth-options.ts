import type { BetterAuthOptions } from 'payload-auth/better-auth'
import { betterAuthPlugins } from '@/features/auth/better-auth-plugins'

export const betterAuthOptions = {
  appName: 'payload-better-auth-cloudflare-neon',
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
    async sendResetPassword({ user, url }) {
      console.log('Send reset password: ', user, url)
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      console.log('Send verification email: ', user, url)
    },
  },

  plugins: betterAuthPlugins,
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
    },
  },
} satisfies BetterAuthOptions

export type ConstructedBetterAuthOptions = typeof betterAuthOptions
