import { admin, emailOTP, multiSession } from 'better-auth/plugins'
import { nextCookies } from 'better-auth/next-js'
import type { BetterAuthPlugin as BetterAuthPluginType } from 'better-auth/types'

export const betterAuthPlugins = [
  emailOTP({
    async sendVerificationOTP({ email, otp, type }) {
      console.log('Send verification OTP for user: ', email, otp, type)
    },
  }),
  admin(),
  multiSession(),
  nextCookies(),
] satisfies BetterAuthPluginType[]

export type BetterAuthPlugins = typeof betterAuthPlugins
