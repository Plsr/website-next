import { Entry } from '@keystatic/core/reader'
import { format } from 'date-fns'
import keystaticConfig from 'keystatic.config'
import Link from 'next/link'

type Post = Entry<(typeof keystaticConfig)['collections']['posts']>
type Props = {
  post: Post
  slug: string
}

export const PostListItem = ({ post, slug }: Props) => {
  return (
    <Link
      className="group flex flex-row justify-between items-center mb-6 text-base-200  hover:bg-base-900/50 hover:shadow-xs transition-all px-2 py-2 -mx-2 rounded-md"
      key={slug}
      href={`/posts/${slug}`}
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
