import { defineCloudflareConfig } from '@opennextjs/cloudflare'
import type { OpenNextConfig } from '@opennextjs/cloudflare'

const config = defineCloudflareConfig()

export default {
  ...config,
  edgeExternals: [...(config.edgeExternals || []), 'jose'],
} satisfies OpenNextConfig
