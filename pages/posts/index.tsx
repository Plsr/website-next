import { NextPageContext } from 'next'
import Link from 'next/link'
import { Button } from '../../components/button'
import Divider from '../../components/divider'
import { Pagination } from '../../components/pagination'
import { PostData, getPaginatedPosts } from '../../lib/posts'
import { StyledArticleContent } from '../../components/styled-article-content'
import { TagsList } from '../../components/tags-list'

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
      <PostsList posts={posts} />
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
        <li key={post.id} className="mb-24">
          <Link href={`/posts/${post.id}`}>
            <div className="flex flex-col mb-8 ">
              <span className="mb-2 text-sm text-slate-500">
                {post.formattedDate}
              </span>
              <span className="text-3xl font-headline">{post.title}</span>
            </div>
          </Link>
          <StyledArticleContent contentHtml={post.contentHtml} />
          {post.tags && <TagsList tags={post.tags?.split(' ')} />}
          <Divider />
        </li>
      ))}
    </ul>
  )
}
