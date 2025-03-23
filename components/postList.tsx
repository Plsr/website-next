import { MDXContent } from '@content-collections/mdx/react'
import { Post } from 'content-collections'
import format from 'date-fns/format'

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
    <div className="dark:prose-invert prose">
      <h2>{post.title}</h2>
      <MDXContent code={post.mdx} />
      <small className="text-base-600">
        {format(new Date(post.date), 'MMMM d, yyyy')}
      </small>
    </div>
  )
}
