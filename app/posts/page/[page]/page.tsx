import { Pagination } from 'components/pagination'
import { getPaginatedPosts } from 'data/posts.dto'
import format from 'date-fns/format'
import Link from 'next/link'

type Props = {
  params: Promise<{
    page: string
  }>
}

export default async function PostsPage(props: Props) {
  const { page } = await props.params
  const pageNumber = Number(page) || 1
  const { posts, totalPages } = getPaginatedPosts(pageNumber)

  return (
    <div className="flex flex-col gap-32">
      {posts.map((post) => {
        return (
          <div
            className="prose-invert prose prose-img:rounded-lg"
            key={post._id}
          >
            <Link
              className="no-underline hover:underline text-center"
              href={`/posts/${post.computedSlug}`}
            >
              <h1 className="mb-9">{post.title}</h1>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <Link className="not-prose" href={`/posts/${post.computedSlug}`}>
              <small className="opacity-60">
                {format(new Date(post.date), 'do LLL, yyyy')}
              </small>
            </Link>
          </div>
        )
      })}
      <Pagination
        currentPage={pageNumber}
        totalPages={totalPages}
        recordName="posts"
      />
    </div>
  )
}
