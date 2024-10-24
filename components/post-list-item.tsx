import { Post } from '.contentlayer/generated'
import { format } from 'date-fns'
import Link from 'next/link'

type Props = {
  post: Post
}

export const PostListItem = ({ post }: Props) => {
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
}
