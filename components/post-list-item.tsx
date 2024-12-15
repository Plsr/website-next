import { Post } from '.contentlayer/generated'
import { CalendarDaysIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import Link from 'next/link'

type Props = {
  post: Post
}

export const PostListItem = ({ post }: Props) => {
  return (
    <Link
      className="dark:hover:bg-base-700 mb-6 inline-flex flex-col rounded-lg p-4 transition-all hover:bg-base-50"
      key={post._id}
      href={`/posts/${post.computedSlug}`}
    >
      <span className="dark:text-base-400 flex items-center gap-1 text-xs text-base-400">
        <CalendarDaysIcon className="mb-[1px] h-3 w-3" />
        {format(new Date(post.date), 'do LLL, yyyy')}
      </span>
      <span className="mb-2 text-lg font-bold">{post.title}</span>
      {post.excerpt && (
        <span className="dark:text-base-300 text-base-500">{post.excerpt}</span>
      )}
    </Link>
  )
}
