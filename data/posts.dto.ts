import { allPosts, Post } from 'content-collections'
import getYear from 'date-fns/getYear'

export function getLastThreePosts() {
  return sortByDateDesc(allPosts).slice(0, 3)
}

const nonDraftPosts = allPosts.filter((post) => !post.draft)

export function getPaginatedPosts(page: number) {
  const postsPerPage = 10
  const lowerEnd = postsPerPage * (page - 1)
  const upperEnd = page * postsPerPage

  return {
    posts: sortByDateDesc(nonDraftPosts).slice(lowerEnd, upperEnd),
    totalPages: allPosts.length / postsPerPage,
  }
}

export function getPostsForTag(tag: string) {
  const postsWithTag = allPosts.filter((post) => {
    return post.tags?.split(' ').includes(tag)
  })

  return sortByDateDesc(postsWithTag)
}

export function getPostForSlug(slug: string) {
  return allPosts.find((post) => post.computedSlug === slug)
}

export function getAllPostsByYear() {
  const sortedPosts = sortByDateDesc(nonDraftPosts)
  const postsByYear: {
    [key: number]: Post[]
  } = {}

  sortedPosts.forEach((post) => {
    const year = getYear(new Date(post.date))

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
