import { getAllSortedPosts, getAllTags } from 'lib/entries'
import Link from 'next/link'
import { format } from 'date-fns'
import { Tag } from 'components/tag'
import { allSeeds } from '.contentlayer/generated'

export default async function Home() {
  const allSortedPosts = getAllSortedPosts()
  const recentBlogPosts = allSortedPosts.slice(0, 5)
  const tags = getAllTags().splice(0, 5)

  // TODO: Move to shared util
  const sortedSeeds = allSeeds.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  return (
    <>
      <link rel="authorization_endpoint" href="https://indieauth.com/auth" />
      <link rel="me" href="https://github.com/plsr" />
      <div className="flex flex-col mb-24">
        <h2 className="text-gray-400 mb-2 font-headline">
          Hi, I&apos;m Chris Jarling 👋
        </h2>
        <p className=" text-gray-100 mb-6 text-2xl font-bold max-w-xl leading-8 font-title">
          <span className="text-rose-500">FullStack Developer</span> specialized
          in Typescript, with a love for sleek User Interfaces
          <sup className="text-sm">
            <a href="#1" className="text-rose-500 underline">
              1
            </a>
          </sup>
          .
          <br />
          Currently working on the world’s first Telecom-as-a-Service at Gigs.
        </p>
        <p className=" text-gray-400 mb-6 max-w-lg">
          This is my personal website, which I use as my primary home on the
          internet. On here, I mostly{' '}
          <Link
            className="text-rose-500 underline-offset-4 underline"
            href="/posts"
          >
            write
          </Link>{' '}
          about software development, partenting and personal growth, try to
          keep some{' '}
          <Link
            className="text-rose-500 underline-offset-4 underline"
            href="/digital-garden"
          >
            notes
          </Link>
          , store my{' '}
          <Link
            className="text-rose-500 underline-offset-4 underline"
            href="/library/articles"
          >
            reading notes
          </Link>{' '}
          and use it as a general playground to try out now things.
        </p>
        <div className="flex gap-x-4 mt-6 flex-wrap">
          <Link
            className="text-rose-500 underline font-lg"
            href="mailto:hi@chrisjarling.com"
          >
            Email
          </Link>
          <Link
            className="text-rose-500 underline font-lg"
            href="https://hachyderm.io/@chrisjarling"
            rel="me"
          >
            Mastodon
          </Link>
          <Link
            className="text-rose-500 underline font-lg"
            href="https://github.com/plsr"
            rel="me"
          >
            Github
          </Link>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">
        Latest posts <AllLink href="/posts" text="all" />
      </h2>
      <ul className="ml-4 mb-6">
        {recentBlogPosts.map((postData) => (
          <li key={postData._id} className="mb-2 list-disc">
            <Link href={`/posts/${postData.slug}`}>
              <span className="text-rose-500 underline">{postData.title}</span>
              <span className="ml-2 text-sm text-neutral-400">
                ({format(new Date(postData.date), 'do LLL, yyyy')})
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-sm">
        Since this is my personal website it serves no purpose other than being
        my place to publish on the internet, I have no fixed topics I write
        about. However, here are the ones I wrote about the most:
      </p>
      <div className="space-x-4 mt-2">
        {tags.map((tag) => (
          <Tag key={tag.tagName} name={tag.tagName} timesUsed={tag.count} />
        ))}
      </div>
      <div className="mt-16">
        <h2 className="text-xl font-bold mb-4">
          Recent updates from the Garden{' '}
          <AllLink href="/digital-garden" text="all" />
        </h2>
        <ul className="ml-4 mb-6">
          {allSeeds.slice(0, 5).map((seedData) => (
            <li key={seedData._id} className="mb-2 list-disc">
              <Link href={`/digital-garden/${seedData.slug}`}>
                <span className="text-rose-500 underline">
                  {seedData.title}
                </span>
                <span className="ml-2 text-sm text-neutral-400">
                  (updated{' '}
                  {format(new Date(seedData.updatedAt), 'do LLL, yyyy')})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div id="1" className="text-sm italic text-neutral-300 mt-24">
        [1]: &rdquo;But this website looks not sleek at all.&rdquo; That&apos;s
        right. The goal of this website is to be very simple and allow me to
        focus on writing (with being a playground for trying out technologies as
        a secondary goal). I find myself struggling with design a lot, so I
        decided to just not do anything fancy.
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
