import { NextPageContext } from 'next'
import Link from 'next/link'
import { Button } from '../../components/button'
import Divider from '../../components/divider'
import { Pagination } from '../../components/pagination'
import { PostData, getPaginatedPosts } from '../../lib/posts'

export async function getServerSideProps(context: NextPageContext) {
  const page = Number(context.query.page) || 0
  const data = await getPaginatedPosts(page)

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
      <h2 className="text-3xl font-headline font-bold mb-8">Posts</h2>
      <PostsList posts={posts} />
      <Divider />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        recordName="posts"
      />
    </>
  )
}

type PostsListProps = {
  posts: PostData[]
}

const PostsList = ({ posts }: PostsListProps) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <div className="flex flex-col mb-8 ">
              <span className="text-sm text-slate-500">
                {post.formattedDate}
              </span>
              <span className="text-xl font-headline">{post.title}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
