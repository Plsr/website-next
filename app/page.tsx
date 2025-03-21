import { PostListItem } from 'components/post-list-item'
import { getPaginatedPosts } from 'lib/entries'
import { Metadata } from 'next'
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
  const { posts } = getPaginatedPosts({
    page: 1,
  })

  return (
    <div className="prose dark:prose-invert">
      <div className="text-lg">
        <div>👋</div>
        <h1 className="text-xl font-bold">Hey, I&apos;m Chris Jarling.</h1>
        <div>
          I&apos;m an Engineering Manager at <a href="https://gigs.com">Gigs</a>
          , where we&apos;re shaping the future of telecom.
        </div>
      </div>
      <div className="opacity-80 mt-4">
        Before becoming an Engineering Manager, I was a Senior Frontend Engineer
        with Gigs. Previously, I worked at <strong>Cisco</strong> and{' '}
        <strong>Placetel</strong>, where I built web apps for a Could-Based PBX
        System. I&apos;ve also did some agency work, one of which I co-founded.
      </div>
      <div className="dark:opacity-60 opacity-80 mt-4">
        This is my personal website, where I share thoughts about programming,
        web development, management and reflections on my personal journey.
      </div>

      <h2 className="prose dark:prose-invert text-lg mt-24">Recent Posts</h2>
      <div className="not-prose">
        {posts.slice(0, 3).map((post) => (
          <PostListItem key={post._id} post={post} />
        ))}
      </div>
      <Link href="/posts">See all</Link>
    </div>
  )
}
