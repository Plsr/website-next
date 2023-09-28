import { PostsList } from '../../components/posts-list'

import { getAllSortedPosts } from '../../lib/entries'
import { getYear } from 'date-fns'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Post } from '.contentlayer/generated'
import Link from 'next/link'
import { BlogPostHeadline } from 'components/blog-post-headline'
import { StyledArticleContent } from 'components/styled-article-content'
import { PencilSquareIcon, QueueListIcon } from '@heroicons/react/24/outline'

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
    <>
      <div className="flex justify-end mb-6 space-x-6">
        <Link
          href="posts/page/1"
          className="text-sm text-rose-500 flex items-center"
        >
          <QueueListIcon className="w-4 h-4 mr-2" /> Stream view
        </Link>
        <Link
          href="/posts/drafts"
          className="text-sm text-rose-500 flex itemx-center"
        >
          <PencilSquareIcon className="w-4 h-4 mr-2" /> Drafts
        </Link>
      </div>
      {sortedPostsByYears.map(([year, posts]) => (
        <div className="mb-16" key={year}>
          <div className="flex flex-row items-center mb-6">
            <h2 className="font-headline text-xl text-neutral-300 mr-4">
              {year}
            </h2>
          </div>
          <PostsList posts={posts} />
        </div>
      ))}
    </>
  )
}
