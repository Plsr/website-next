import { getPaginatedPosts } from 'lib/entries'
import { Metadata } from 'next'
import { PostListItem } from 'components/post-list-item'
import Link from 'next/link'
import Image from 'next/image'
import { GigsCallout } from 'components/GigsCallout'

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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="self-center">
          <h1 className="dark:text-gray-200 mb-4 text-3xl font-bold text-gray-900">
            <span className="dark:text-gray-500 font-normal text-gray-400">
              Hej, I&apos;m
            </span>{' '}
            Chris Jarling
          </h1>
          <p className="dark:text-gray-400 text-gray-600">
            <strong>Engineering Manager</strong> and Fullstack Engineer with a
            focus on building scalable, user-centered web applications. <br />I
            thrive on solving complex problems, fostering collaboration, and
            delivering impactful results through a balance of technical
            expertise and clear communication.
          </p>
        </div>
        <Image
          className="hidden rotate-3 place-self-center self-center rounded-xl shadow-[0px_0px_14px_rgba(0,0,0,0.028),0px_0px_22px_rgba(0,0,0,0.04),0px_0px_28.4px_rgba(0,0,0,0.052),0px_0px_53px_rgba(0,0,0,0.08)] md:block"
          src="/me.jpg"
          width={250}
          height={250}
          quality={100}
          alt=""
        />
      </div>
      <GigsCallout />
      <div className="mt-24">
        <h2 className="mb-4 text-2xl font-bold">
          <span className="dark:text-gray-500 font-normal text-gray-400">
            Recent
          </span>{' '}
          Posts
        </h2>
        <div className="not-prose">
          {posts.slice(0, 3).map((post) => (
            <div key={post._id} className="-ml-4">
              <PostListItem post={post} />
            </div>
          ))}
        </div>
        <Link
          href="/posts"
          className="dark:text-indigo-400 text-sm text-indigo-600 hover:underline"
        >
          See All &rsaquo;
        </Link>
      </div>
    </div>
  )
}
