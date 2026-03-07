import { groupPublishedPostsByYear } from 'data/posts.dto'
import { format } from 'date-fns'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Archive - Chris Jarling',
}

export default async function PostsIndex() {
  const sortedPostsByYears = await groupPublishedPostsByYear()

  if (sortedPostsByYears.length === 0) {
    notFound()
  }

  return (
    <div>
      <h1 className="font-bold text-3xl mb-12">Archive</h1>
      {sortedPostsByYears.map(([year, posts]) => (
        <div className="mb-12" key={year}>
          <h2 className="text-xl text-base-400 mb-4">{year}</h2>
          <ul className="space-y-2">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="flex justify-between items-baseline gap-4"
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-base-100 hover:text-accent-600 transition-colors"
                >
                  {post.entry.title}
                </Link>
                <span className="text-sm text-base-400 shrink-0">
                  {format(new Date(post.entry.date), 'do LLL')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
