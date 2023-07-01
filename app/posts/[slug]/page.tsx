import { StyledArticleContent } from 'components/styled-article-content'
import { BlogPostHeadline } from 'components/blog-post-headline'
import { PostMetadata } from 'components/post-metadata'
import { PostSeriesBlock } from 'components/PostSeriesBlock'
import { postSeriesList, SeriesEntry } from 'lib/post-series'
import { Tag } from 'components/tag'
import { notFound } from 'next/navigation'
import { allPosts, Post } from '.contentlayer/generated'
import { formatDistanceToNow } from 'date-fns'
import { Metadata } from 'next'

type Params = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return allPosts.map((post: Post) => ({
    slug: post.computedSlug,
  }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = allPosts.find((post: Post) => {
    return post.computedSlug === params.slug
  })

  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  const title = `${post.title} - Chris Jarling`
  const description = post.excerpt || post.body.raw.slice(0, 150)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: 'https://www.chrisjarling.com/og.jpg',
          secureUrl: 'https://www.chrisjarling.com/og.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function Post({ params }: Params) {
  const post = allPosts.find((post: Post) => {
    return post.computedSlug === params.slug
  })

  if (!post) {
    notFound()
  }

  const seriesEntries = post.series ? postSeriesList(post.series) : undefined

  return (
    <>
      <div>
        <div className="mb-8">
          <div className="mb-2">
            <PostMetadata>
              {formatDistanceToNow(new Date(post.date))} ago
            </PostMetadata>
          </div>
          <BlogPostHeadline title={post.title} />
          {seriesEntries && (
            <PostSeriesBlock
              seriesEntries={seriesEntries}
              activeEntryId={params.slug}
            />
          )}
        </div>
        <StyledArticleContent contentHtml={post.body.html} />
      </div>
      {post.tags?.split(' ').map((tag) => (
        <Tag name={tag} key={tag} />
      ))}
    </>
  )
}
