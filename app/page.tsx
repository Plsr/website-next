import Image from 'next/image'
import memoji from '../public/memoji.png'
import RecentArticle from '../components/recent-article'
import HomepageHeadline from '../components/homepage-headline'
import { SocialLink } from '../components/social-link'
import { getAllSortedPosts } from 'lib/entries'
import Link from 'next/link'

export default async function Home() {
  const allSortedPosts = getAllSortedPosts()
  const recentBlogPosts = allSortedPosts.slice(0, 3)

  return (
    <>
      <link rel="authorization_endpoint" href="https://indieauth.com/auth" />
      <link rel="me" href="https://github.com/plsr" />
      <div className="flex flex-col mb-24">
        <h2 className="text-sm text-gray-400 mb-2 font-headline">
          Hi, I&apos;m Chris Jarling 👋
        </h2>
        <p className=" text-gray-100 mb-6 text-xl font-bold max-w-xl leading-8 font-title">
          <span className="relative after:absolute after:left-0 after:bottom-0 after:z-[-1] after:bg-turkish-rose-500 after:h-2 after:w-full">
            FullStack Developer
          </span>{' '}
          specialized in Typescript, with a love for sleek User Interfaces.
          <br />
          Currently working on the worlds first Telecom-as-a-Service at Gigs.
        </p>
        <p className=" text-gray-400 mb-6 max-w-lg ml-12">
          This is my personal website, which I use as my primary home on the
          internet. On here, I mostly{' '}
          <Link
            className="text-turkish-rose-500 underline-offset-4 underline"
            href="/posts"
          >
            write
          </Link>{' '}
          about software development, partenting and personal growth, try to
          keep some{' '}
          <Link
            className="text-turkish-rose-500 underline-offset-4 underline"
            href="/digital-garden"
          >
            notes
          </Link>{' '}
          and use it as a general playground to try out now things.
        </p>
        <div className="flex gap-x-4 mt-12 flex-wrap">
          <SocialLink href="mailto:hi@chrisjarling.com">Email</SocialLink>
          <SocialLink href="https://hachyderm.io/@chrisjarling" rel="me">
            Mastodon
          </SocialLink>
          <SocialLink href="https://github.com/plsr" rel="me">
            Github
          </SocialLink>
        </div>
      </div>

      <HomepageHeadline>Latest posts</HomepageHeadline>
      <ul>
        {recentBlogPosts.map((postData) => (
          <li key={postData._id} className="mb-8">
            <RecentArticle
              slug={postData.computedSlug}
              title={postData.title}
              date={postData.date}
              excerpt={postData.excerpt}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
