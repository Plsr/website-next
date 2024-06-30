import { getAllSortedPosts, getAllTags } from 'lib/entries'
import Link from 'next/link'
import { format, formatDistanceToNow, getYear } from 'date-fns'
import { Tag } from 'components/tag'
import { Post, allSeeds } from '.contentlayer/generated'
import { PostsList } from 'components/posts-list'
import { Metadata } from 'next'
import Image from 'next/image'
import { Calendar, Mail, PencilLine } from 'lucide-react'

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
    <div className="prose dark:prose-invert mt-12">
      <div className="flex flex-row items-center gap-4">
        <Image
          width="120"
          height="120"
          src="/me.jpg"
          alt="A portrait shot of Chris Jarling"
          className="rounded-lg"
        />
        <div className="flex-row">
          <p className="font-bold mb-0">Hey, I'm Chris Jarling 👋</p>
          <p className="mt-0">
            I'm a Senior Fullstack Engineer and Team Lead working at Gigs where
            I specialize in building great web apps that help our customers go
            to market with lightspeed.
          </p>
        </div>
      </div>
      <h2 className="text-sm">Experience</h2>
      <div className="not-prose flex flex-col gap-6">
        <WorkExperience />
        <div>
          <h3>Software Engineer</h3>
          <span>Cisco</span>
          <span>Apr. 2021 - Oct. 2022</span>
        </div>
        <div>
          <h3>Fullstack Engineer</h3>
          <span>Railslove</span>
          <span>2016 - Mar. 2021</span>
        </div>
      </div>
      <ul>
        {allSortedPosts.map((post) => (
          <li key={post._id}>
            <a href={post.url}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const WorkExperience = () => {
  return (
    <div className="flex flex-col">
      <h3 className="font-bold text-lg">Senior Fullstack Engineer</h3>
      <span className="underline decoration-dotted">Gigs</span>
      <span className="text-base-400">Nov. 2022 - now</span>
    </div>
  )
}
