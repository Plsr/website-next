import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import remarkGfm from 'remark-gfm'

const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: ['**/*.md', '**/*.mdx'],
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    draft: z.boolean().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      // @ts-ignore
      remarkPlugins: [remarkGfm],
    })

    return {
      ...document,
      mdx,
      slug: document.title.toLowerCase().replace(/ /g, '-'),
    }
  },
})

export default defineConfig({
  collections: [posts],
})
