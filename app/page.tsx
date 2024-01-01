import { getAllSortedPosts, getAllTags } from 'lib/entries'
import Link from 'next/link'
import { format, getYear } from 'date-fns'
import { Tag } from 'components/tag'
import { Post, allSeeds } from '.contentlayer/generated'
import { PostsList } from 'components/posts-list'

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
      <div className="group inline-block cursor-pointer">
        <Link href={allSortedPosts[0].url}>
          <h2 className="text-base-600 mb-2">Latest Article</h2>
          <div>
            <h3 className="text-base-300 text-xl font-bold group-hover:text-accent-500">
              {allSortedPosts[0].title}
            </h3>
            <span className="text-base-500">{allSortedPosts[0].excerpt}</span>
          </div>
        </Link>
      </div>
      <hr className="my-12 border-base-700" />
      <div>
        <h2 className="text-base-600 mb-2">Points of interest</h2>
        <Link href="/now" className="mr-4 underline text-accent-500">
          Now
        </Link>
        <Link
          href="/library/articles"
          className="mr-4 underline text-accent-500"
        >
          Reading Notes
        </Link>
        <Link href="/digital-garden" className="mr-4 underline text-accent-500">
          Digital Garden
        </Link>
        <Link href="/tags" className="mr-4 underline text-accent-500">
          Tags
        </Link>
      </div>
      <hr className="my-12 border-base-700" />
      <h2 className="text-xl font-bold mb-6 text-base-500">All Articles</h2>
      {sortedPostsByYears.map(([year, posts]) => (
        <div className="mb-16" key={year}>
          <div className="flex flex-row items-center mb-2">
            <h2 className="font-headline text-lg font-bold text-base-300 mr-4">
              {year}
            </h2>
          </div>
          <PostsList posts={posts} />
        </div>
      ))}
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
