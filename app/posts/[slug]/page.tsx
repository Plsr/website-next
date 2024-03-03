import { StyledArticleContent } from 'components/styled-article-content'
import { BlogPostHeadline } from 'components/blog-post-headline'
import { PostMetadata } from 'components/post-metadata'
import { PostSeriesBlock } from 'components/PostSeriesBlock'
import { postSeriesList } from 'lib/post-series'
import { Tag } from 'components/tag'
import { notFound } from 'next/navigation'
import { allPosts, Post } from '.contentlayer/generated'
import { format } from 'date-fns'
import { Metadata } from 'next'

type Params = {
  params: {
    slug: string
  }
}

export const generateStaticParams = () => []

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
    <div className="mx-auto max-w-2xl mb-16">
      <div>
        <div className="mb-8 ">
          <div className="mb-2 ">
            <PostMetadata>
              {format(new Date(post.date), 'do LLL, yyyy')}
            </PostMetadata>
          </div>
          <h2 className="text-slate-200 font-bold text-2xl">{post.title}</h2>
          {post.draft && (
            <div className="rounded-lg p-4 my-6 bg-rose-bud-700/10 border border-rose-bud-900 text-indigo-bud-200 text-sm">
              This post is a draft. It&apos;s not complete yet and may never be.
            </div>
          )}
          {seriesEntries && (
            <PostSeriesBlock
              seriesEntries={seriesEntries}
              activeEntryId={params.slug}
            />
          )}
        </div>
        <StyledArticleContent contentHtml={post.body.html} />
      </div>
      <div className="space-x-4">
        {post.tags?.split(' ').map((tag) => (
          <Tag name={tag} key={tag} />
        ))}
      </div>
    </div>
  )
}
