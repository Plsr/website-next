import { PostsList } from '../../components/posts-list'

import { BlogPost, getAllSortedEntries } from '../../lib/entries'
import { getYear } from 'date-fns'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allPosts, Post } from '.contentlayer/generated'

export const metadata: Metadata = {
  title: 'Posts - Chris Jarling',
}

type PostsByYear = {
  [key: number]: Post[]
}

const getPostsByYear = async () => {
  const data = allPosts
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
  const postsByYear = await getPostsByYear()

  if (!postsByYear) {
    notFound()
  }

  const sortedPostsByYears = Object.entries(postsByYear)
    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
    .map((e) => e)

  return (
    <>
      {sortedPostsByYears.map(([year, posts]) => (
        <div className="mb-16" key={year}>
          <div className="flex flex-row items-center mb-6">
            <h2 className="font-headline text-xl text-neutral-300 mr-4">
              {year}
            </h2>
            <div className="h-1 w-full border-b border-b-neutral-600" />
          </div>
          <PostsList posts={posts} />
        </div>
      ))}
    </>
  )
}
