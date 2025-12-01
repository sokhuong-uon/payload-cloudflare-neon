import type { BetterAuthPluginOptions } from 'payload-auth/better-auth'
import { betterAuthOptions } from '@/features/auth/better-auth-options'

export const betterAuthPluginOptions = {
  disabled: false,
  debug: {
    logTables: true,
    enableDebugLogs: true,
  },

  disableDefaultPayloadAuth: true,
  admin: {
    loginMethods: ['emailPassword'],
  },

  hidePluginCollections: true,

  users: {
    hidden: false,
    roles: ['user', 'admin'] as const,
    allowedFields: ['name'],
  },
  adminInvitations: {
    sendInviteEmail: async ({ email, url }) => {
      console.log('Send admin invite: ', email, url)
      return {
        success: true,
      }
    },
  },

  betterAuthOptions,
} satisfies BetterAuthPluginOptions

export type ConstructedBetterAuthPluginOptions = typeof betterAuthPluginOptions
