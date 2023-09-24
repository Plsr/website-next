import Link from 'next/link'
import { PostMetadata } from './post-metadata'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { Post } from '.contentlayer/generated'

type PostsListProps = {
  posts: Post[]
}

export const PostsList = ({ posts }: PostsListProps) => {
  return (
    <ul className="ml-4">
      {posts.map((post) => (
        <li key={post._id} className="mb-2 list-disc">
          <Link href={`/posts/${post.computedSlug}`}>
            <span className="text-rose-500 underline">
              {post.draft && '📝 '}
              {post.title}
            </span>
            <span className="ml-2 text-sm text-neutral-400">
              ({format(new Date(post.date), 'do LLL, yyyy')})
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
