import { PostsRepository } from './posts.repository'

const DEFAULT_PER_PAGE = 10

export const totalPages = ({
  perPage = DEFAULT_PER_PAGE,
}: {
  perPage?: number
}) => {
  const posts = PostsRepository.getPublished()

  return posts.length / perPage
}

export const getPostsForPage = ({
  page,
  perPage = DEFAULT_PER_PAGE,
}: {
  page: number
  perPage?: number
}) => {
  const posts = PostsRepository.getPublished()

  // Sort posts newest to oldest
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const start = (page - 1) * perPage
  const end = start + perPage
  return sortedPosts.slice(start, end)
}

export const getPostBySlug = ({ slug }: { slug: string }) => {
  const posts = PostsRepository.getPublished()
  return posts.find((post) => post.slug === slug)
}

export const getSortedPosts = () => {
  const posts = PostsRepository.getPublished()
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}
