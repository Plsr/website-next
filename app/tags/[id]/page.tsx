import { getAllSortedPosts, getAllTags } from 'lib/entries'
import { PostsList } from 'components/posts-list'
import { Tag } from 'components/tag'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    id: tag.tagName,
  }))
}

type PostsIndexProps = {
  params: { id: string }
}

export default async function PostsIndex({ params }: PostsIndexProps) {
  const tag = params.id
  const posts = getAllSortedPosts().filter(
    (post) => post.tags && post.tags.split(' ').includes(tag)
  )

  if (posts.length === 0) {
    notFound()
  }

  return (
    <>
      <h2 className="prose dark:prose-invert flex items-center mb-8">
        <span className="text-xl font-bold block mr-2">
          All {posts.length} Posts tagged
        </span>
        <Tag.Pill hover={false}>#{tag}</Tag.Pill>
      </h2>
      {posts.map((post) => {
        return (
          <Link
            className="flex flex-col mb-6"
            key={post._id}
            href={`/posts/${post.computedSlug}`}
          >
            <span className="dark:text-base-500 text-sm">
              {format(new Date(post.date), 'do LLL, yyyy')}
            </span>
            <span>{post.title}</span>
          </Link>
        )
      })}
    </>
  )
}
