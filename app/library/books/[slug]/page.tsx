import Markdoc from '@markdoc/markdoc'
import { cms } from 'data/cms'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

type Params = {
  params: Promise<{
    slug: string
  }>
}

function StarRating({ rating }: { rating: number | null }) {
  if (!rating) return null
  const filled = '★'.repeat(rating)
  const empty = '☆'.repeat(5 - rating)
  return (
    <span className="text-accent-500">
      {filled}
      {empty}
    </span>
  )
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params
  const book = await cms.books.get(params.slug)

  if (!book) {
    return { title: 'Book Not Found' }
  }

  const title = `${book.title} by ${book.author} - Chris Jarling`

  return {
    title,
    description: `Notes on ${book.title} by ${book.author}`,
    openGraph: {
      title,
      description: `Notes on ${book.title} by ${book.author}`,
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

export const generateStaticParams = () => []

const BookDetailPage = async (props: Params) => {
  const params = await props.params
  const book = await cms.books.get(params.slug)

  if (!book) {
    return notFound()
  }

  const { node } = await book.content()
  const errors = Markdoc.validate(node)
  if (errors.length) {
    console.error(errors)
    throw new Error('Invalid content')
  }
  const renderable = Markdoc.transform(node)
  const hasContent =
    node.children && node.children.length > 0 && node.children[0].children

  return (
    <div>
      <Link href="/library/books" className="mb-1 block text-sm text-base-700">
        <span className="text-base-700">← All books</span>
      </Link>

      <div className="mt-8 flex gap-6">
        {book.cover ? (
          <Image
            src={book.cover}
            alt={book.title}
            width={128}
            height={192}
            className="h-48 w-32 flex-shrink-0 rounded object-cover"
          />
        ) : (
          <div className="flex h-48 w-32 flex-shrink-0 items-center justify-center rounded bg-base-800 text-center text-sm text-base-600">
            No cover
          </div>
        )}
        <div>
          <h1 className="text-2xl font-semibold text-base-200">{book.title}</h1>
          <p className="mt-1 text-base-400">{book.author}</p>
          {book.rating && (
            <p className="mt-2">
              <StarRating rating={book.rating} />
            </p>
          )}
          {book.dateRead && (
            <p className="mt-1 text-sm text-base-600">{book.dateRead}</p>
          )}
        </div>
      </div>

      {hasContent && (
        <div className="prose prose-invert mt-8 prose-img:rounded-lg">
          {Markdoc.renderers.react(renderable, React)}
        </div>
      )}
    </div>
  )
}

export default BookDetailPage
