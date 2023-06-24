import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypePrism from 'rehype-prism-plus'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.md',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    tags: { type: 'string', required: false },
    excerpt: { type: 'string', required: false },
    series: { type: 'string', required: false },
    slug: { type: 'string', required: false },
  },
  computedFields: {
    // TODO: Make distinctin between slug and flattendPath here
    // TODO: Also compute slug
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
    computedSlug: {
      type: 'string',
      resolve: (post) => post.slug || post._raw.flattenedPath,
    },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  markdown: { rehypePlugins: [rehypePrism] },
})
