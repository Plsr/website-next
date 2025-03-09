import { PostMetadata } from 'components/post-metadata'
import { PostSeriesBlock } from 'components/PostSeriesBlock'
import { StyledArticleContent } from 'components/styled-article-content'
import { Tag } from 'components/tag'
import { format } from 'date-fns'
import { postSeriesList } from 'lib/post-series'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { allPosts, Post as PostType } from '.contentlayer/generated'

type Params = {
  params: Promise<{
    slug: string
  }>
}

export const generateStaticParams = () => []

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params
  const post = allPosts.find((post: PostType) => {
    return post.computedSlug === params.slug
  })

  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  const title = `${post.title} - Chris Jarling`
  const description =
    post.metaDescription || post.excerpt || post.body.raw.slice(0, 150)

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

export default async function Post(props: Params) {
  const params = await props.params
  const post = allPosts.find((post: PostType) => {
    return post.computedSlug === params.slug
  })

  if (!post) {
    notFound()
  }

  const seriesEntries = post.series ? postSeriesList(post.series) : undefined

  return (
    <div className="mx-auto max-w-5xl mb-16">
      <div>
        <div className="mb-4">
          <PostMetadata>
            {format(new Date(post.date), 'do LLL, yyyy')}
          </PostMetadata>
          <h2 className="mt-0 text-base-800 dark:text-base-300 font-bold text-2xl">
            {post.title}
          </h2>
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
        {post.tags?.split(' ').map((tag) => <Tag name={tag} key={tag} />)}
      </div>
    </div>
  )
}
