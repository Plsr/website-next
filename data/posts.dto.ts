import { createReader } from '@keystatic/core/reader'
import { allPosts, Post } from 'content-collections'
import getYear from 'date-fns/getYear'
import keystaticConfig from 'keystatic.config'

const reader = createReader(process.cwd(), keystaticConfig)

export async function getRecentPosts() {
  const posts = await _publishedPosts()
  const sortedPosts = posts.sort((a, b) => {
    const aDate = new Date(a.entry.date)
    const bDate = new Date(b.entry.date)
    return bDate.getTime() - aDate.getTime()
  })

  return sortedPosts.slice(0, 3)
}

export function getLastThreePosts() {
  return sortByDateDesc(allPosts).slice(0, 3)
}

export function getPostsForTag(tag: string) {
  const postsWithTag = allPosts.filter((post) => {
    return post.tags?.split(' ').includes(tag)
  })

  return sortByDateDesc(postsWithTag)
}

export async function getPostForSlug(slug: string) {
  return await reader.collections.posts.read(slug)
}

export async function groupPublishedPostsByYear() {
  const posts = await _publishedPosts()
  const sortedPosts = _sortPostsDesc(posts)
  const postsByYear: {
    [key: number]: KeystaticPosts
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

export function getAllSortedPosts() {
  return sortByDateDesc(allPosts)
}

function sortByDateDesc(posts: Post[]) {
  return [...posts].sort((a, b) => {
    const aDate = new Date(a.date)
    const bDate = new Date(b.date)
    return bDate.getTime() - aDate.getTime()
  })
}

// Internal utility functions
type KeystaticPosts = Awaited<ReturnType<typeof _publishedPosts>>

async function _publishedPosts() {
  const posts = await reader.collections.posts.all()
  return posts.filter((posts) => posts.entry.draft !== true)
}

function _sortPostsDesc(posts: KeystaticPosts) {
  return [...posts].sort((a, b) => {
    const aDate = new Date(a.entry.date)
    const bDate = new Date(b.entry.date)
    return bDate.getTime() - aDate.getTime()
  })
}
