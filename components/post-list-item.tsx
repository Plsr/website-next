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
      className="mb-6 flex flex-col rounded-lg p-4 transition-all hover:bg-base-50 dark:hover:bg-base-700"
      key={post._id}
      href={`/posts/${post.computedSlug}`}
    >
      <span className="flex items-center gap-1 text-xs text-base-400 dark:text-base-400">
        <CalendarDaysIcon className="mb-[1px] h-3 w-3" />
        {format(new Date(post.date), 'do LLL, yyyy')}
      </span>
      <span className="mb-2 text-lg font-bold dark:text-base-100">
        {post.title}
      </span>
      {post.excerpt && (
        <span className="text-base-500 dark:text-base-400">{post.excerpt}</span>
      )}
    </Link>
  )
}
