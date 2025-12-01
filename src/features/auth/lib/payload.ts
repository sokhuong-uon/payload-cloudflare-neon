import configPromise from '@payload-config'
import { getPayloadAuth } from 'payload-auth/better-auth'
import { ConstructedBetterAuthPluginOptions } from '@/features/auth/better-auth-plugin-options'

export const getPayload = async () =>
  getPayloadAuth<ConstructedBetterAuthPluginOptions>(configPromise)
