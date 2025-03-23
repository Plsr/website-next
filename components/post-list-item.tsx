import { Post } from 'content-collections'
import { format } from 'date-fns'
import Link from 'next/link'

type Props = {
  post: Post
}

export const PostListItem = ({ post }: Props) => {
  return (
    <Link
      className="flex flex-col mb-6 dark:text-base-100 text-base-700"
      key={post.title}
      href={`/posts/${post.slug}`}
    >
      <span className="text-sm dark:text-base-300 text-base-500">
        {format(new Date(post.date), 'do LLL, yyyy')}
      </span>
      <span className="font-bold">{post.title}</span>
    </Link>
  )
}
