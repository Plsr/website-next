import { allPosts } from '.contentlayer/generated'

export type SeriesEntry = {
  title: string
  url: string
  id: string
}

export const postSeriesList = (seriesName: string) => {
  const seriesPosts = allPosts.filter(
    (post) => post.series && post.series === seriesName
  )

  return seriesPosts
    .map((post) => {
      return {
        title: post.title,
        url: post.url,
        id: post._id,
      }
    })
    .reverse()
}
