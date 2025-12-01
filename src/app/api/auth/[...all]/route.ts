import { toNextJsHandler } from 'better-auth/next-js'
import { getPayload } from '@/features/auth/lib/payload'

export const POST = async (request: Request) => {
  const payload = await getPayload()
  const handler = toNextJsHandler(payload.betterAuth)
  return handler.POST(request)
}

export const GET = async (request: Request) => {
  const payload = await getPayload()
  const handler = toNextJsHandler(payload.betterAuth)
  return handler.GET(request)
}
