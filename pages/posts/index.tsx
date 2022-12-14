import { format } from 'date-fns'
import Link from 'next/link'
import { getSortedPostsData, PostData } from '../../lib/posts'

export async function getStaticProps() {
  const posts = await getSortedPostsData()

  return {
    props: {
      posts,
    },
  }
}

export default function PostsIndex({ posts }: PostsIndexProps) {
  console.log(posts)
  return (
    <div>
      <h2 className="text-3xl font-headline font-bold mb-8">Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <div className="flex flex-col mb-8 ">
                <span className="text-sm text-slate-500">{post.date}</span>
                <span className="text-xl font-headline">{post.title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

type PostsIndexProps = {
  posts: PostData[]
}
