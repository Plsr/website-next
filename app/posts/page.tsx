import { getAllSortedPosts } from '../../lib/entries'
import { format, getYear } from 'date-fns'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Post } from '.contentlayer/generated'
import Link from 'next/link'
import { PostListItem } from 'components/post-list-item'

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
    <div className="dark:prose-invert prose">
      {sortedPostsByYears.map(([year, posts]) => (
        <div className="not-prose mb-16" key={year}>
          <div className="mb-6 flex flex-row items-center">
            <h2 className="font-headline dark:text-base-200 mr-4 text-xl text-base-800">
              {year}
            </h2>
          </div>
          <div className="-ml-4">
            {posts.map((post) => (
              <PostListItem post={post} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
