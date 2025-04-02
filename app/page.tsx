import { PostListItem } from 'components/post-list-item'
import { getPaginatedPosts } from 'lib/entries'
import { Metadata } from 'next'
import Image from 'next/image'
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
      <div className="flex flex-row items-center gap-4">
        <Image
          src="/me_notion.jpg"
          alt="Chris Jarling Portrait"
          width={200}
          height={200}
          className="rounded-full w-16 h-16"
        />
        <div className="flex flex-col not-prose">
          <h1 className="text-base-200 -mb-1">Chris Jarling</h1>
          <span>Engineering Manager @ Gigs</span>
        </div>
      </div>

      <div>
        I&apos;m an Engineering Manager at <a href="https://gigs.com">Gigs</a>,
        where we&apos;re shaping the future of telecom. Before becoming an
        Engineering Manager, I worked as a Senior Fullstack Engineer.
      </div>
      <div className="mt-4">
        I take great joy and pride in building a great product that provides
        value for users and being part of something bigger than myself. While I
        enjoy writing code a lot and am pretty good at it, I will take on
        whatever responsibility it takes to make the thing I work on a success.
      </div>
      <div className="mt-4">
        Previously, I worked at <strong>Cisco</strong> and{' '}
        <strong>Placetel</strong>, where I built web apps for a Could-Based PBX
        System. I also did some agency work, one of which I co-founded.
      </div>
      <div className=" mt-4">
        This is my personal website, where I share thoughts about programming,
        web development, management and reflections on my personal journey.
      </div>

      <h2 className="not-prose mt-24 mb-4 opacity-60 font-normal">
        Recent Writing
      </h2>
      <div className="not-prose">
        {posts.slice(0, 3).map((post) => (
          <PostListItem key={post._id} post={post} />
        ))}
      </div>
      <Link href="/posts">See all</Link>
    </div>
  )
}
