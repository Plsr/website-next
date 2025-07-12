import { allPosts, Post } from 'content-collections'
import getYear from 'date-fns/getYear'

export function getLastThreePosts() {
  return sortByDateDesc(allPosts).slice(0, 3)
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
  const sortedPosts = sortByDateDesc(allPosts)
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

function sortByDateDesc(posts: Post[]) {
  return posts.toSorted((a, b) => {
    const aDate = new Date(a.date)
    const bDate = new Date(b.date)
    return bDate.getTime() - aDate.getTime()
  })
}
