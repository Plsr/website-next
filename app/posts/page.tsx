import { getAllSortedPosts } from '../../lib/entries'
import { format, getYear } from 'date-fns'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Post } from '.contentlayer/generated'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Posts - Chris Jarling',
}

type PostsByYear = {
  [key: number]: Post[]
}

const getPostsByYear = () => {
  const data = getAllSortedPosts()
  const postsByYear: PostsByYear = {}

  data.forEach((page) => {
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
          })}
        </div>
      ))}
    </div>
  )
}
