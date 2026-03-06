import { PostMetadata } from 'components/post-metadata'
import { getPaginatedPosts } from 'data/posts.dto'
import { format } from 'date-fns'
import { Metadata } from 'next'
import Link from 'next/link'

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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1)
  const { posts, totalPages } = await getPaginatedPosts(currentPage)

  return (
    <div>
      <div className="space-y-16">
        {posts.map((post) => (
          <article key={post.slug}>
            <div className="mb-4">
              <PostMetadata>
                {format(new Date(post.entry.date), 'do LLL, yyyy')}
              </PostMetadata>
              <Link href={`/posts/${post.slug}`}>
                <h2 className="mt-0 font-bold text-3xl font-title hover:text-accent-600 transition-colors">
                  {post.entry.title}
                </h2>
              </Link>
            </div>
            {post.previewHtml && (
              <div className="prose prose-img:rounded-lg">
                <p>{post.previewHtml}</p>
              </div>
            )}
            <Link
              href={`/posts/${post.slug}`}
              className="text-sm text-accent-600 hover:text-accent-500 transition-colors mt-2 inline-block"
            >
              Continue reading
            </Link>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="flex justify-between items-center mt-12 text-sm">
          {currentPage > 1 ? (
            <Link
              href={`/?page=${currentPage - 1}`}
              className="text-base-400 hover:text-base-200 transition-colors"
            >
              Newer posts
            </Link>
          ) : (
            <span />
          )}
          <span className="text-base-500">
            {currentPage} / {totalPages}
          </span>
          {currentPage < totalPages ? (
            <Link
              href={`/?page=${currentPage + 1}`}
              className="text-base-400 hover:text-base-200 transition-colors"
            >
              Older posts
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  )
}
