import { MarkdocRenderer } from 'components/markdoc-renderer'
import { PostMetadata } from 'components/post-metadata'
import { Tag } from 'components/tag'
import { getPostData, getPostMetaData } from 'data/posts.dto'
import { getLogger } from 'lib/logger'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

type Params = {
  params: Promise<{
    slug: string
  }>
}

const log = getLogger()
export const generateStaticParams = () => []

export async function generateMetadata(props: Params): Promise<Metadata> {
  const { slug } = await props.params
  const postData = await getPostMetaData(slug)

  if (!postData) {
    log.error(`Post not found for slug: ${slug}`)
    return {}
  }

  const { title, description } = postData

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
  const { slug } = await props.params
  const postData = await getPostData(slug)

  if (!postData) {
    notFound()
  }

  const { date, isDraft, title, tags, renderableContent } = postData

  return (
    <div className="mx-auto max-w-xl mb-16">
      <div>
        <div className="mb-4">
          <PostMetadata>{date}</PostMetadata>
          <h2 className="mt-0 font-bold text-3xl font-title">{title}</h2>
          {isDraft && (
            <div className="rounded-lg p-4 my-6 bg-rose-bud-700/10 border border-rose-bud-900 text-indigo-bud-200 text-sm">
              This post is a draft. It&apos;s not complete yet and may never be.
            </div>
          )}
        </div>
      </div>
      <MarkdocRenderer renderableContent={renderableContent} />
      <div className="space-x-4">
        {tags.map((tag) => (
          <Tag name={tag} key={tag} />
        ))}
      </div>
    </div>
  )
}
