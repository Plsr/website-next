import { createReader } from '@keystatic/core/reader'
import getYear from 'date-fns/getYear'
import keystaticConfig from 'keystatic.config'

import { cms, Posts } from './cms'

const reader = createReader(process.cwd(), keystaticConfig)

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

export async function getPostForSlug(slug: string) {
  return await reader.collections.posts.read(slug)
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
