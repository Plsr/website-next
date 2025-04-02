import { format } from 'date-fns'
import Link from 'next/link'

import { Post } from '.contentlayer/generated'

type Props = {
  post: Post
}

export const PostListItem = ({ post }: Props) => {
  return (
    <Link
      className="group flex flex-row justify-between items-center mb-6 dark:text-base-200 text-base-700 hover:dark:bg-base-900/50 hover:dark:shadow-xs transition-all px-2 py-2 -mx-2 rounded-md"
      key={post._id}
      href={`/posts/${post.computedSlug}`}
    >
      <span className="group-hover:text-base-50 transition-colors">
        {post.title}
      </span>
      <span className="text-sm dark:text-base-600 text-base-400 group-hover:text-base-500 transition-colors">
        {format(new Date(post.date), 'do LLL, yyyy')}
      </span>
    </Link>
  )
}
