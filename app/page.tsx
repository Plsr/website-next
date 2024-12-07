import { getPaginatedPosts } from 'lib/entries'
import { Metadata } from 'next'
import { PostListItem } from 'components/post-list-item'
import Link from 'next/link'
import Image from 'next/image'

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
      <div className="grid grid-cols-2">
        <div className="self-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            <span className="text-gray-400 font-normal">Hej, I&apos;m</span>{' '}
            Chris Jarling
          </h1>
          <p className=" text-gray-600">
            <strong>Engineering Manager</strong> and Fullstack Engineer with a
            focus on building scalable, user-centered web applications. <br />I
            thrive on solving complex problems, fostering collaboration, and
            delivering impactful results through a balance of technical
            expertise and clear communication.
          </p>
        </div>
        <Image
          className="rounded-xl shadow-[0px_0px_14px_rgba(0,0,0,0.028),0px_0px_22px_rgba(0,0,0,0.04),0px_0px_28.4px_rgba(0,0,0,0.052),0px_0px_53px_rgba(0,0,0,0.08)] border place-self-center self-center rotate-3"
          src="/me.jpg"
          width={250}
          height={250}
          quality={100}
          alt=""
        />
      </div>
      <div className="flex border gap-2 border-gray-200 bg-gray-50 rounded-lg mt-20 p-4">
        <Image
          className="self-center"
          src="/gigs_logo.png"
          width={130}
          height={34}
          alt=""
        />
        <p className="flex-wrap text-gray-500 text-sm">
          I currently work as an <strong>Engineering Manager</strong> at{' '}
          <strong>Gigs</strong>, where we shape the future of telecom.
          We&apos;re hiring, come work with me.{' '}
          <Link href="/" className="text-gray-700 underline">
            Read why you should &rarr;
          </Link>
        </p>
        <button className="self-center text-sm shrink-0 hover:bg-indigo-600 transition-colors bg-indigo-500 border border-indigo-600 rounded-lg px-4 py-1 text-indigo-50">
          Work with me
        </button>
      </div>
      <div className="mt-24">
        <h2 className="text-2xl font-bold mb-4">
          <span className="text-gray-400 font-normal">Recent</span> Posts
        </h2>
        <div className="not-prose">
          {posts.slice(0, 3).map((post) => (
            <div key={post._id} className="-ml-4">
              <PostListItem post={post} />
            </div>
          ))}
        </div>
        <Link href="/posts" className="text-indigo-600 text-sm hover:underline">
          See All &rsaquo;
        </Link>
      </div>
    </div>
  )
}
