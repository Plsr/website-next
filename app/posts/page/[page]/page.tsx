import { Pagination } from 'components/pagination'
import { PostList } from 'components/postList'
import { getPostsForPage, totalPages } from 'data/posts.dto'

export async function generateStaticParams() {
  return Array.from({ length: totalPages({}) }, (_, i) => ({
    page: (i + 1).toString(),
  }))
}

type Props = {
  params: Promise<{ page: string }>
}

const PaginatedPostsPage = async ({ params }: Props) => {
  const { page } = await params
  const posts = getPostsForPage({ page: parseInt(page) })
  return (
    <div className="gap-24 flex flex-col">
      <PostList posts={posts} />
      <Pagination currentPage={parseInt(page)} totalPages={totalPages({})} />
    </div>
  )
}

export default PaginatedPostsPage
