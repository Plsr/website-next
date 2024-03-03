import { getAllSortedPosts, getAllTags } from 'lib/entries'
import Link from 'next/link'
import { format, formatDistanceToNow, getYear } from 'date-fns'
import { Tag } from 'components/tag'
import { Post, allSeeds } from '.contentlayer/generated'
import { PostsList } from 'components/posts-list'
import { Metadata } from 'next'
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
    'Senior Frontend Egineer working with React & Next.js, sharing thoughts on web development, productivity, and team culture.',
  alternates: {
    types: {
      'application/rss+xml': '/posts/feed.rss',
      'application/atom+xml': '/posts/feed.atom',
    },
  },
  openGraph: {
    title: 'Chris Jarling',
    description:
      'Senior Frontend Egineer working with React & Next.js, sharing thoughts on web development, productivity, and team culture.',
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
    <>
      <link rel="authorization_endpoint" href="https://indieauth.com/auth" />
      <link rel="me" href="https://github.com/plsr" />
      <div className="relative">
        <Intro />
        <div className="flex items-center justify-between gap-6 mb-6">
          <h2 className="text-base-400 flex items-center gap-2">
            <PencilLine className="w-4 h-4" /> Writing
          </h2>
          <Link
            className="text-base-300 py-2 px-4 hover:bg-base-800 hover:text-base-200 rounded-lg transition"
            href="/posts"
          >
            See all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-48">
          <LatestArticle article={allSortedPosts[0]} />
          <RecentArticles posts={allSortedPosts.slice(1, 4)} />
        </div>
        {false && (
          <div className="flex items-center gap-6 mb-6 mt-24">
            <h2 className="text-base-400 mb-2 flex items-center gap-2">
              <PencilLine className="w-4 h-4" /> Projects
            </h2>
          </div>
        )}
      </div>
    </>
  )
}

type AllLinkProps = {
  text: string
  href: string
}

const AllLink = ({ text, href }: AllLinkProps) => {
  return (
    <span className="font-normal text-md">
      (
      <Link href={href} className=" text-rose-500 underline">
        {text}
      </Link>
      )
    </span>
  )
}

const Intro = () => {
  return (
    <div className="my-36 flex flex-col gap-8 items-start">
      <div>
        <div className="text-sm text-base-500 mb-1">
          <span className="opacity-80">👋</span> Hi, I&apos;m Chris Jarling
        </div>
        <div className="relative text-3xl font-bold text-base-200 mb-2">
          <div className="absolute -right-24 -top-8 md:flex hidden flex-col">
            <div className="font-handwriting text-xs text-slate-700 ml-4 mb-2">
              We&apos;re hiring
            </div>
            <ArrowCustomIcon className=" fill-slate-800" />
          </div>
          Senior Frontend Engineer at Gigs
        </div>
        <div className="text-lg text-base-400">
          I build web applications that spark joy using React & Next.js
        </div>
      </div>
      <div className="gap-4 flex flex-wrap flex-row text-base-300">
        <PillThing>
          <a
            className="flex gap-2 items-center"
            href="https://twitter.com/chrisjarling"
          >
            <XIcon className="w-3 h-3 fill-current" />
            chrisjarling
          </a>
        </PillThing>
        <PillThing>
          <a className="flex gap-2 items-center" href="https://github.com/plsr">
            <GithubIcon className="w-3 h-3 fill-current" />
            plsr
          </a>
        </PillThing>
        <PillThing>
          <a
            className="flex gap-2 items-center"
            href="mailto:hi@chrisjarling.com"
          >
            <Mail className="w-3 h-3" />
            hi@chrisjarling.com
          </a>
        </PillThing>
      </div>
    </div>
  )
}

const PillThing = ({ children }) => {
  return (
    <div className="flex hover:bg-base-800 hover:border-base-700 transition text-sm px-3 py-1 rounded-lg bg-base-900 border border-base-800">
      {children}
    </div>
  )
}

const LatestArticle = ({ article }: { article: Post }) => {
  return (
    <div className="self-center group inline-block bg-base-900/80 p-8 rounded-lg border border-base-800 hover:bg-base-800/50 transition-all">
      <Link href={article.url}>
        <h2 className="text-base-600 mb-3">Latest Article</h2>
        <div>
          <h3 className="text-base-300 text-xl font-bold group-hover:text-accent-500/80 transition mb-2">
            {article.title}
          </h3>

          <span className="text-base-500">{article.excerpt}</span>
          <div className="flex items-center text-sm text-base-500 mt-6">
            <Calendar className="w-4 h-4 inline-block mr-2" />
            {formatDistanceToNow(new Date(article.date))} ago
          </div>
          <div className="flex gap-2 mt-3">
            {article.tags?.split(' ')?.map((tag) => (
              <div
                className="bg-accent-500/40 px-3 py-1 rounded-full text-xs text-accent-200"
                key={tag}
              >
                #{tag}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}

const RecentArticles = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="divide-y divide-base-800 flex-1">
      {posts.map((post) => (
        <div key={post._id} className="py-4">
          <Link href={post.url}>
            <h3 className="hover:text-accent-400 transition">{post.title}</h3>
          </Link>
          <div className="flex gap-2 items-center text-xs text-base-400 mt-2">
            <Calendar className="w-3 h-3" />
            {formatDistanceToNow(new Date(post.date))} ago
          </div>
        </div>
      ))}
    </div>
  )
}

const XIcon = ({ ...props }) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>X</title>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  )
}

const GithubIcon = ({ ...props }) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

const ArrowCustomIcon = ({ ...props }) => {
  return (
    <svg
      width="41"
      height="31"
      viewBox="0 0 41 31"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13.1284 22.4175L12.8666 21.4524L13.1284 22.4175ZM0.894159 25.0027C0.619465 25.4818 0.785184 26.0929 1.26431 26.3676L9.07208 30.844C9.55121 31.1187 10.1623 30.953 10.437 30.4739C10.7117 29.9947 10.546 29.3837 10.0669 29.109L3.12661 25.1299L7.10567 18.1896C7.38037 17.7105 7.21465 17.0994 6.73553 16.8247C6.2564 16.55 5.64531 16.7158 5.37061 17.1949L0.894159 25.0027ZM12.8666 21.4524L1.49996 24.5349L2.02343 26.4652L13.3901 23.3827L12.8666 21.4524ZM38.3567 0.074203C33.4064 10.5937 24.0874 18.4095 12.8666 21.4524L13.3901 23.3827C25.177 20.1862 34.9663 11.9761 40.1663 0.925783L38.3567 0.074203Z" />
    </svg>
  )
}
