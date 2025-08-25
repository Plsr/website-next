import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMarkdown } from '@content-collections/markdown'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import { z } from 'zod'

const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    slug: z.string().optional(),
    tags: z.string().optional(),
    draft: z.boolean().optional().default(false),
    series: z.string().optional(),
    metaDescription: z.string().optional(),
    excerpt: z.string().optional(),
  }),
  transform: async (doc, context) => {
    const html = await compileMarkdown(context, doc, {
      // @ts-expect-error unified type mismatch across dependency versions
      rehypePlugins: [rehypePrism],
      // @ts-expect-error unified type mismatch across dependency versions
      remarkPlugins: [remarkGfm],
    })
    const computedSlug = doc.slug || doc._meta.path.replace('/posts/', '')
    return {
      ...doc,
      // TODO: Only here to make the migration easier, remove later and use
      // something that is native to content-collections and can be used as an
      // identifier
      _id: doc._meta.filePath,
      computedSlug,
      html,
    }
  },
})

const LibraryArticle = defineCollection({
  name: 'LibraryArticle',
  directory: 'content/library/articles',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    link: z.string(),
    createdAt: z.string(),
    tags: z.string().optional(),
  }),
  transform: async (doc, context) => {
    const html = await compileMarkdown(context, doc)
    const computedSlug = doc._meta.path
      .replace('/library/articles/', '')
      .toLowerCase()
    return {
      ...doc,
      // TODO: Only here to make the migration easier, remove later and use
      // somehting the is native to content-collections and can be used as an
      // identifier
      _id: doc._meta.filePath,
      computedSlug,
      html,
    }
  },
})

export default defineConfig({
  collections: [posts, LibraryArticle],
})
