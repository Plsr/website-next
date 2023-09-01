import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypePrism from 'rehype-prism-plus'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import wikiLinkPlugin from 'remark-wiki-link'
import remark2rehype from 'remark-rehype'

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

export const Seed = defineDocumentType(() => ({
  name: 'Seed',
  filePathPattern: 'garden/*.md',
  fields: {
    title: { type: 'string', required: true },
    wip: { type: 'boolean', required: false },
    createdAt: { type: 'string', required: true },
    updatedAt: { type: 'string', required: true },
    excerpt: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (seed) => seed._raw.flattenedPath.replace('garden/', ''),
    },
    url: {
      type: 'string',
      resolve: (seed) => `/${seed._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Note, Seed],
  markdown: (builder) => {
    builder.use(remarkFrontmatter)
    builder.use(remarkParse as any)
    builder.use(remark2rehype)
    builder.use(rehypeStringify as any)
    builder.use(rehypePrism)
    builder.use(wikiLinkPlugin, {
      hrefTemplate: (permalink: string) => `/digital-garden/${permalink}`,
    })
  },
})
