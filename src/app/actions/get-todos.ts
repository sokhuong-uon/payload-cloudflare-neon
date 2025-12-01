'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function getTodos() {
  try {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'todos',
      limit: 100,
      where: {
        _status: {
          equals: 'published',
        },
      },
    })

    return docs
  } catch (error) {
    console.error('Failed to fetch todos:', error)
    return []
  }
}
