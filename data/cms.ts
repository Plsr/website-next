import { createReader } from '@keystatic/core/reader'
import keystaticConfig from 'keystatic.config'

const reader = createReader(process.cwd(), keystaticConfig)

export type Posts = Awaited<ReturnType<typeof cms.posts.allPublished>>

// Heavily inspired by timo
// see https://github.com/timomeh/timomeh.de/blob/main/src/data/cms.ts
export const cms = {
  posts: {
    async allPublished() {
      const posts = await reader.collections.posts.all()

      return posts.filter((posts) => posts.entry.draft !== true)
    },
  },
}
