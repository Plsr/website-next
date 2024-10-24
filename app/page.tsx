import { getPaginatedPosts } from 'lib/entries'
import { Metadata } from 'next'
import { PostListItem } from 'components/post-list-item'
import Link from 'next/link'

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

  return (
    <div className="prose dark:prose-invert">
      <div className="text-lg">
        <div>👋</div>
        <div>Hey, I&apos;m Chris Jarling.</div>
        <div>
          I&apos;m a Senior Fullstack Engineer and interim Team Lead at Gigs,
          where we&apos;re shaping the future of telecom.
        </div>
      </div>
      <div className="opacity-60 mt-4">
        This is my personal website, where I share thoughts about programming,
        web development, and reflections on my personal journey.
      </div>

      <h2>Recent Posts</h2>
      <div className="not-prose">
        {posts.slice(0, 3).map((post) => (
          <PostListItem key={post._id} post={post} />
        ))}
      </div>
      <Link href="/posts">See all</Link>
    </div>
  )
}
