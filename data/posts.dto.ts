import { PostsRepository } from './posts.repository'

const DEFAULT_PER_PAGE = 10

export const totalPages = ({
  perPage = DEFAULT_PER_PAGE,
}: {
  perPage?: number
}) => {
  const posts = PostsRepository.getAll()
  const publishedPosts = posts.filter((post) => !post.draft)

  return publishedPosts.length / perPage
}

export const getPostsForPage = ({
  page,
  perPage = DEFAULT_PER_PAGE,
}: {
  page: number
  perPage?: number
}) => {
  const posts = PostsRepository.getAll()

  const publishedPosts = posts.filter((post) => !post.draft)

  // Sort posts newest to oldest
  const sortedPosts = publishedPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const start = (page - 1) * perPage
  const end = start + perPage
  return sortedPosts.slice(start, end)
}
