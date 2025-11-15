import { allPosts } from 'content-collections'

export type Tag = {
  tagName: string
  count: number
}

export function getAllTags() {
  const posts = allPosts
  const allTags: { [key: string]: number } = {}

  posts.forEach((post) => {
    const postTags = post.tags?.split(' ')

    if (postTags && postTags.length > 0) {
      postTags.forEach((tag) => {
        if (allTags[tag]) {
          allTags[tag] += 1
        } else {
          allTags[tag] = 1
        }
      })
    }
  })

  const tagsArray = Object.entries(allTags).map(
    ([tagName, count]) =>
      ({
        tagName,
        count,
      }) as Tag,
  )

  const sortedTagsArray = tagsArray.sort((a, b) => b.count - a.count)

  return sortedTagsArray
}
