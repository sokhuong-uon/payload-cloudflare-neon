import type { CollectionConfig } from 'payload'

export const Todos: CollectionConfig = {
  slug: 'todos',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'description', 'completed', '_status'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'completed',
      type: 'checkbox',
      required: true,
    },
  ],
}
