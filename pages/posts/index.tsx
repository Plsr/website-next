import { NextPageContext } from 'next'
import { Pagination } from '../../components/pagination'
import { PostData, getPaginatedPosts } from '../../lib/posts'
import { PostsList } from '../../components/posts-list'

export async function getServerSideProps(context: NextPageContext) {
  const page = Number(context.query.page) || 0
  const data = await getPaginatedPosts({ page })

  return {
    props: {
      ...data,
    },
  }
}

type PostsIndexProps = {
  posts: PostData[]
  currentPage: number
  totalPages: number
  totalPostsCount: number
}

export default function PostsIndex({
  posts,
  currentPage,
  totalPages,
}: PostsIndexProps) {
  return (
    <>
      <PostsList posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        recordName="posts"
      />
    </>
  )
}
