import { GetStaticPropsContext, NextPageContext } from 'next'
import { Pagination } from '../../../components/pagination'
import { PostData, getPaginatedPosts } from '../../../lib/posts'
import { PostsList } from '../../../components/posts-list'

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const page = Number(params?.page) || 0

  const data = await getPaginatedPosts({ page })
  return {
    props: {
      ...data,
    },
  }
}

export async function getStaticPaths() {
  // TODO: Maybe extract to function that only gets the total number of pages
  const { totalPages } = await getPaginatedPosts({ page: 0 })
  console.log(totalPages)

  return {
    // Opt-in to on-demand generation for non-existent pages
    fallback: true,
    paths: [...Array(totalPages)].map((_, index) => ({
      params: {
        page: (index + 1).toString(),
      },
    })),
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
