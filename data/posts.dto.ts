import Markdoc from '@markdoc/markdoc'
import { format } from 'date-fns'
import getYear from 'date-fns/getYear'
import { getLogger } from 'lib/logger'

import { cms, Post, Posts } from './cms'

const log = getLogger()

export async function getRecentPosts() {
  const posts = await cms.posts.allPublished()
  const sortedPosts = posts.sort((a, b) => {
    const aDate = new Date(a.entry.date)
    const bDate = new Date(b.entry.date)
    return bDate.getTime() - aDate.getTime()
  })

  return sortedPosts.slice(0, 3)
}

export async function getPostsForTag(tag: string) {
  const posts = await cms.posts.allPublished()

  const postsWithTag = posts.filter((post) => {
    return post.entry.tags?.split(' ').includes(tag)
  })

  return _sortPostsDesc(postsWithTag)
}

export async function getPostMetaData(slug: string) {
  const post = await cms.posts.get(slug)

  if (!post) {
    return null
  }

  const description = await _createMetaDescription(post)
  const title = `${post.title} - Chris Jarling`
  return {
    title,
    description,
  }
}

export async function getPostData(slug: string) {
  const post = await cms.posts.get(slug)

  if (!post) {
    return null
  }

  const date = format(new Date(post.date), 'do LLL, yyyy')

  const { node } = await post.content()
  const errors = Markdoc.validate(node)
  if (errors.length) {
    log.error(errors.join(','))
    return null
  }

  const renderableContent = Markdoc.transform(node)
  const tags = post.tags?.split(' ')

  return {
    title: post.title,
    isDraft: !!post.draft,
    date,
    tags,
    renderableContent,
  }
}

export async function groupPublishedPostsByYear() {
  const posts = await cms.posts.allPublished()
  const sortedPosts = _sortPostsDesc(posts)
  const postsByYear: {
    [key: number]: Posts
  } = {}

  sortedPosts.forEach((post) => {
    const year = getYear(new Date(post.entry.date))

    if (!postsByYear[year]) {
      postsByYear[year] = [post]
      return
    }

    postsByYear[year].push(post)
  })

  return Object.entries(postsByYear)
    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
    .map((e) => e)
}

export async function getAllSortedPosts() {
  const posts = await cms.posts.allPublished()
  return _sortPostsDesc(posts)
}

// Internal utility functions

function _sortPostsDesc(posts: Posts) {
  return [...posts].sort((a, b) => {
    const aDate = new Date(a.entry.date)
    const bDate = new Date(b.entry.date)
    return bDate.getTime() - aDate.getTime()
  })
}

async function _createMetaDescription(post: Post) {
  if (post.metaDescription) {
    return post.metaDescription
  }

  if (post.excerpt) {
    return post.excerpt
  }

  const { node } = await post.content()
  const ast = Markdoc.format(node)
  const htmlContent = Markdoc.renderers.html(ast)

  return htmlContent.slice(0, 150)
}
