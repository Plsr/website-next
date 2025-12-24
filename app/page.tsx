import 'data/kernel'

import { PostListItem } from 'components/post-list-item'
import { SocialLinks } from 'components/social-links'
import { ShowLandingPagePostsAction } from 'data/cmsModule'
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

export default async function Home() {
  const posts = await ShowLandingPagePostsAction.invoke()

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
        <TimelineItem
          title="Engineering Manager"
          company="Gigs"
          startDate="2024"
        />
        <TimelineItem
          title="Senior Fullstack Engineer"
          company="Gigs"
          startDate="2022"
          endDate="2024"
        />
        <TimelineItem
          title="Software Engineer"
          company="Cisco"
          startDate="2020"
          endDate="2022"
        />
        <TimelineItem
          title="Fullstack Engineer"
          company="Railslove"
          startDate="2016"
          endDate="2020"
        />
        <TimelineItem
          title="Designer & Developer"
          company="Self-Founded Agency"
          startDate="2014"
          endDate="2016"
        />
      </div>
      <Link
        href="/cv"
        className="text-sm inline-flex gap-1 items-center no-underline border-b border-base-600 border-dotted "
      >
        Full CV <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

type TimelineItemProps = {
  title: string
  company: string
  startDate: string
  endDate?: string
}
const TimelineItem = ({
  title,
  company,
  startDate,
  endDate,
}: TimelineItemProps) => {
  const current = endDate === undefined
  return (
    <div className="relative py-4">
      <div className="flex flex-col">
        <div className="flex flex-row gap-2">
          <span>
            {startDate} {current ? null : ` - ${endDate}`}
          </span>
          {current && (
            <div className="inline bg-accent-800/30 px-2 pt-[3px] pb-[0px] border border-accent-800/70 text-accent-400 rounded-full text-xs">
              Current
            </div>
          )}
        </div>
        <span className="text-base-200">{title}</span>
        <span className="text-sm">{company}</span>
      </div>
    </div>
  )
}
