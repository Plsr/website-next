import { MDXContent } from '@content-collections/mdx/react'
import { PostMetadata } from 'components/post-metadata'
import { getPostBySlug } from 'data/posts.dto'
import { format } from 'date-fns'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Params = {
  params: Promise<{
    slug: string
  }>
}

export const generateStaticParams = () => []

export default async function Post(props: Params) {
  const params = await props.params
  const post = getPostBySlug({ slug: params.slug })

  if (!post) {
    notFound()
  }

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
        </div>
        <div className="dark:prose-invert prose prose-img:rounded-lg">
          <MDXContent code={post.mdx} />
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params
  const post = getPostBySlug({ slug: params.slug })

  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  const title = `${post.title} - Chris Jarling`

  // TODO: Bring back post meta description
  const description = post.content.slice(0, 150)

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
