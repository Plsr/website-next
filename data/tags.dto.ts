import { cms } from './cms'

export type Tag = {
  tagName: string
  count: number
}

export async function getAllTags() {
  const posts = await cms.posts.allPublished()
  const allTags: { [key: string]: number } = {}

  posts.forEach((post) => {
    const postTags = post.entry.tags?.split(' ')

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
