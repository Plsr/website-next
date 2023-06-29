import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypePrism from 'rehype-prism-plus'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/*.md',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    tags: { type: 'string', required: false },
    excerpt: { type: 'string', required: false },
    series: { type: 'string', required: false },
    slug: { type: 'string', required: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    computedSlug: {
      type: 'string',
      resolve: (post) =>
        post.slug || post._raw.flattenedPath.replace('posts/', ''),
    },
  },
}))

export const Note = defineDocumentType(() => ({
  name: 'Note',
  filePathPattern: 'notes/*.md',
  fields: {
    title: { type: 'string', required: true },
    headline: { type: 'string', required: false },
    link: { type: 'string', required: false },
    layout: { type: 'string', required: false },
    date: { type: 'string', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (note) => `/${note._raw.flattenedPath}`,
    },
    slug: {
      type: 'string',
      resolve: (note) => note._raw.flattenedPath.replace('notes/', ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Note],
  markdown: { rehypePlugins: [rehypePrism] },
})
