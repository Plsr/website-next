import { PostListItem } from 'components/post-list-item'
import { Post } from 'content-collections'
import { getSortedPosts } from 'data/posts.dto'
import { getYear } from 'date-fns'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Posts - Chris Jarling',
}

type PostsByYear = {
  [key: number]: Post[]
}

const getPostsByYear = () => {
  const posts = getSortedPosts()
  const postsByYear: PostsByYear = {}

  posts.forEach((page) => {
    const year = getYear(new Date(page.date))

    if (!postsByYear[year]) {
      postsByYear[year] = [page]
      return
    }
    postsByYear[year].push(page)
  })

  return postsByYear
}

export default async function PostsIndex() {
  const postsByYear = getPostsByYear()

  if (!postsByYear) {
    notFound()
  }

  const sortedPostsByYears = Object.entries(postsByYear)
    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
    .map((e) => e)

  return (
    <div className="prose dark:prose-invert">
      {sortedPostsByYears.map(([year, posts]) => (
        <div className="mb-16 not-prose" key={year}>
          <div className="flex flex-row items-center mb-6">
            <h2 className="font-headline text-xl text-neutral-800 mr-4">
              {year}
            </h2>
          </div>
          {posts.map((post) => {
            return <PostListItem key={post.title} post={post} />
          })}
        </div>
      ))}
    </div>
  )
}
