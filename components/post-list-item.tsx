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
      className="mb-6 hover:bg-gray-50 inline-flex flex-col p-4 rounded-lg transition-all"
      key={post._id}
      href={`/posts/${post.computedSlug}`}
    >
      <span className="dark:text-base-500 text-xs flex text-gray-400 items-center gap-1">
        <CalendarDaysIcon className="w-3 h-3 mb-[1px]" />
        {format(new Date(post.date), 'do LLL, yyyy')}
      </span>
      <span className="text-lg font-bold mb-2">{post.title}</span>
      {post.excerpt && <span className="text-gray-500">{post.excerpt}</span>}
    </Link>
  )
}
