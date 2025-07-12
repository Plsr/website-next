import { PostListItem } from 'components/post-list-item'
import { getAllPostsByYear } from 'data/posts.dto'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Posts - Chris Jarling',
}

export default async function PostsIndex() {
  const sortedPostsByYears = getAllPostsByYear()

  if (!sortedPostsByYears) {
    notFound()
  }

  return (
    <>
      {sortedPostsByYears.map(([year, posts]) => (
        <div className="mb-16 not-prose" key={year}>
          <div className="flex flex-row items-center mb-6">
            <h2 className="font-headline text-xl text-neutral-600 mr-4">
              {year}
            </h2>
          </div>
          {posts.map((post) => {
            return <PostListItem key={post._id} post={post} />
          })}
        </div>
      ))}
    </>
  )
}
