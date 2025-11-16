import { createReader } from '@keystatic/core/reader'
import keystaticConfig from 'keystatic.config'

const reader = createReader(process.cwd(), keystaticConfig)

export type Posts = Awaited<ReturnType<typeof cms.posts.allPublished>>
export type Post = NonNullable<Awaited<ReturnType<typeof cms.posts.get>>>

// Heavily inspired by timo
// see https://github.com/timomeh/timomeh.de/blob/main/src/data/cms.ts
export const cms = {
  posts: {
    async allPublished() {
      const posts = await reader.collections.posts.all()

      return posts.filter((posts) => posts.entry.draft !== true)
    },
    async get(slug: string) {
      const post = await reader.collections.posts.read(slug)

      if (!post) {
        return null
      }

      return post
    },
  },
  readingNotes: {
    async all() {
      const readingNotes = await reader.collections.readingNotes.all()

      return readingNotes
    },
    async get(slug: string) {
      const sanitizedSlug = slug.toLowerCase()

      const note = await reader.collections.readingNotes.read(sanitizedSlug)

      if (!note) {
        return null
      }

      return note
    },
  },
}
