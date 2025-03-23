import { MDXContent } from '@content-collections/mdx/react'
import { Post } from 'content-collections'

type Props = {
  posts: Post[]
}
export const PostList = ({ posts }: Props) => {
  return (
    <>
      {posts.map((post) => (
        <div className="dark:prose-invert prose" key={post.title}>
          <h2>{post.title}</h2>
          <MDXContent code={post.mdx} />
        </div>
      ))}
    </>
  )
}
