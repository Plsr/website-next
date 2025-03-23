import { Pagination } from 'components/pagination'
import { PostList } from 'components/postList'
import { getPostsForPage, totalPages } from 'data/posts.dto'
import { Metadata } from 'next'

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
  const totalPagesCount = totalPages({})
  const posts = getPostsForPage({ page: 1 })

  return (
    <div className="gap-24 flex flex-col">
      <PostList posts={posts} />
      <Pagination currentPage={1} totalPages={totalPagesCount} />
    </div>
  )
}
