import { getAllSortedPosts, getAllTags, getPaginatedPosts } from 'lib/entries'
import Link from 'next/link'
import { format, formatDistanceToNow, getYear } from 'date-fns'
import { Tag } from 'components/tag'
import { Post, allSeeds } from '.contentlayer/generated'
import { PostsList } from 'components/posts-list'
import { Metadata } from 'next'
import Image from 'next/image'
import { Calendar, Mail, PencilLine } from 'lucide-react'
import { PostMetadata } from 'components/post-metadata'
import { StyledArticleContent } from 'components/styled-article-content'
import { Pagination } from 'components/pagination'

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

export const metadata: Metadata = {
  title: 'Chris Jarling',
  description:
    'Senior Frontend Engineer working with React & Next.js, sharing thoughts on web development, productivity, and team culture.',
  alternates: {
    types: {
      'application/rss+xml': '/posts/feed.rss',
      'application/atom+xml': '/posts/feed.atom',
    },
  },
  openGraph: {
    title: 'Chris Jarling',
    description:
      'Senior Frontend Engineer working with React & Next.js, sharing thoughts on web development, productivity, and team culture.',
    url: 'https://chrisjarling.com',
    images: [
      {
        url: 'https://www.chrisjarling.com/og.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default async function Home() {
  const { posts, totalPages, currentPage } = getPaginatedPosts({
    page: 1,
  })
  const allSortedPosts = getAllSortedPosts()
  const recentBlogPosts = allSortedPosts.slice(0, 5)
  const tags = getAllTags().splice(0, 5)

  // TODO: Move to shared util
  const sortedSeeds = allSeeds.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  const postsByYear = getPostsByYear()

  const sortedPostsByYears = Object.entries(postsByYear)
    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
    .map((e) => e)

  return (
    <>
      <PostsList posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        recordName="posts"
      />
    </>
  )
}
