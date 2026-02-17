import { PostListItem } from 'components/post-list-item'
import { SocialLinks } from 'components/social-links'
import { getRecentPosts } from 'data/posts.dto'
import { ArrowRight, Briefcase, FileText } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ViewTransition } from 'react'

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

type TimelineItemProps = {
  title: string
  company: string
  timeframe?: string
  highlights?: string[]
  isCurrent?: boolean
  isLast?: boolean
}

const TimelineItem = ({
  title,
  company,
  timeframe,
  highlights,
  isCurrent = false,
  isLast = false,
}: TimelineItemProps) => {
  const expanded = highlights !== undefined && highlights.length > 0

  return (
    <div className="grid grid-cols-[20px_1fr] gap-4">
      <div className="relative flex justify-center">
        <span
          className={`mt-2 h-2.5 w-2.5 rounded-full ${isCurrent ? 'bg-accent-500 shadow-[0_0_18px_4px_rgba(245,146,11,0.55)]' : 'bg-base-500/40'}`}
        />
        {!isLast && (
          <span
            className={`absolute top-6 bottom-0 w-px ${isCurrent ? 'bg-base-300/70' : 'bg-base-500/35'}`}
          />
        )}
      </div>

      <div className={expanded ? 'pb-10' : 'pb-6'}>
        <h3 className="text-lg font-title leading-none">
          <span className="text-base-200">{title}</span>{' '}
          <span className="text-base-500">{company}</span>
        </h3>
        {timeframe && (
          <p className="mt-1.5 text-sm text-base-400">{timeframe}</p>
        )}
        {highlights && (
          <ul className="mt-4 space-y-1.5 text-sm text-base-300">
            {highlights.map((highlight) => (
              <li key={highlight}>- {highlight}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

const workHistory = [
  {
    title: 'Engineering Manager',
    company: 'Gigs',
    timeframe: '2024 - present',
    highlights: [
      'Owned and continuously evolved the fullstack hiring pipeline (including take-home and live-coding formats), enabling ambitious hiring goals without lowering quality.',
      'Led a team of 5 through leadership transition and post-restructuring restaffing, rebuilding a high-performing team and maintaining delivery momentum.',
      'Expanded scope by taking over a second team in a key vertical while driving cross-team frontend reliability work (dependency upgrades, security fixes, platform health).',
      'Drove product and technical direction hands-on by steering major product/design changes, advancing AI adoption through practical tooling, and staying deep in architecture and implementation details.',
    ],
  },
  {
    title: 'Senior Fullstack Engineer',
    company: 'Gigs',
    timeframe: '2022 - 2024',
  },
  {
    title: 'Software Engineer',
    company: 'Cisco',
    timeframe: '2020 - 2022',
  },
  {
    title: 'Fullstack Engineer',
    company: 'Railslove',
    timeframe: '2016 - 2020',
  },
  {
    title: 'Designer & Developer',
    company: 'Self-Founded Agency',
    timeframe: '2014 - 2016',
  },
]

export default async function Home() {
  const posts = await getRecentPosts()

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-8 mb-8">
        <ViewTransition name="avatar">
          <Image
            src="/dithered.png"
            alt="Chris Jarling Portrait"
            width={200}
            height={200}
            className="rounded-lg w-32 h-32 md:w-56 md:h-56 mb-0 border border-base-700 rotate-3"
          />
        </ViewTransition>
        <div className="flex flex-col not-prose text-center md:text-left items-center md:items-start">
          <h1 className="font-main text-base-100 -mb-1 text-sm">
            Chris Jarling
          </h1>
          <span className="text-base-600">Engineering Manager @ Gigs</span>
          <span className="block mt-4 text-base-200">
            I love{' '}
            <span className="font-title text-lg text-accent-600 italic">
              building
            </span>{' '}
            things with people
          </span>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>
      </div>

      <div className="prose prose-invert">
        <div>
          I&apos;m an Engineering Manager at <a href="https://gigs.com">Gigs</a>
          , where we&apos;re shaping the future of telecom. Before becoming an
          Engineering Manager, I worked as a Senior Fullstack Engineer.
        </div>
        <div className="mt-4">
          I take great joy and pride in building a great product that provides
          value for users and being part of something bigger than myself. While
          I enjoy writing code a lot and am pretty good at it, I will take on
          whatever responsibility it takes to make the thing I work on a
          success.
        </div>
        <div className="mt-4">
          Previously, I worked at <strong>Cisco</strong> and{' '}
          <strong>Placetel</strong>, where I built web apps for a Could-Based
          PBX System. I also did some agency work, one of which I co-founded.
        </div>
        <div className=" mt-4">
          This is my personal website, where I share thoughts about programming,
          web development, management and reflections on my personal journey.
        </div>
      </div>

      <h2 className="text-sm mt-24 mb-4 opacity-60 font-normal flex gap-2 items-center">
        <FileText className="h-4 w-4 text-base-300" />
        <span>Recent Writing</span>
      </h2>
      <div className="not-prose">
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post.entry} slug={post.slug} />
        ))}
      </div>
      <Link
        className="text-sm inline-flex gap-1 items-center no-underline border-b border-base-600 border-dotted "
        href="/posts"
      >
        See all <ArrowRight className="w-4 h-4" />
      </Link>

      <div>
        <h2 className="text-sm mt-24 mb-4 opacity-60 font-normal flex gap-2 items-center">
          <Briefcase className="h-4 w-4 text-base-300" />
          <span>Work History</span>
        </h2>
        <div className="not-prose">
          {workHistory.map((item, index) => (
            <TimelineItem
              key={`${item.title}-${item.company}`}
              title={item.title}
              company={item.company}
              timeframe={item.timeframe}
              highlights={item.highlights}
              isCurrent={index === 0}
              isLast={index === workHistory.length - 1}
            />
          ))}
        </div>
      </div>
      <Link
        href="/cv"
        className="not-prose mt-2 text-sm inline-flex gap-1 items-center no-underline border-b border-base-600 border-dotted "
      >
        Full CV <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
