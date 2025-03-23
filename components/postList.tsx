import { MDXContent } from '@content-collections/mdx/react'
import { Post } from 'content-collections'
import format from 'date-fns/format'
import Link from 'next/link'

type Props = {
  posts: Post[]
}
export const PostList = ({ posts }: Props) => {
  return (
    <>
      {posts.map((post) => (
        <PostListItem key={post.title} post={post} />
      ))}
    </>
  )
}

const PostListItem = ({ post }: { post: Post }) => {
  return (
    <div className="dark:prose-invert prose prose-img:rounded-lg">
      <Link href={`/posts/${post.slug}`}>
        <h2>{post.title}</h2>
      </Link>
      <MDXContent code={post.mdx} />
      <small className="text-base-600">
        {format(new Date(post.date), 'MMMM d, yyyy')}
      </small>
    </div>
  )
}
