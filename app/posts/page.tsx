import { getAllSortedPosts, getAllTags } from '../../lib/entries'
import { getYear } from 'date-fns'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Post } from '.contentlayer/generated'
import { PostListItem } from 'components/post-list-item'
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
  const tags = getAllTags()

  const sortedPostsByYears = Object.entries(postsByYear)
    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
    .map((e) => e)

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">All posts</h1>
      <p className="mb-6">
        I write about a number of things, this website has no fixed topic.
        However, most of my writing seems to roughly gravitate around personal
        updates and technology.
        <br />
        <br />
        Here are some of the topics I write most about:
      </p>
      <div className="mb-16 flex flex-wrap gap-2">
        {tags.slice(0, 5).map((tag) => (
          <Link
            href={`/tags/${tag.tagName}`}
            className="rounded-md bg-base-700 px-3 py-2 text-base-100 transition-colors hover:bg-base-600"
            key={tag.tagName}
          >
            {tag.tagName}
          </Link>
        ))}
        <Link
          href="/tags"
          className="rounded-md bg-base-500 px-3 py-2 text-base-100 transition-colors hover:bg-base-400"
        >
          see all
        </Link>
      </div>
      <div className="prose dark:prose-invert">
        {sortedPostsByYears.map(([year, posts]) => (
          <div className="not-prose mb-16" key={year}>
            <div className="mb-6 flex flex-row items-center">
              <h2 className="font-headline mr-4 text-2xl text-base-800 dark:text-base-200">
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
    </>
  )
}
