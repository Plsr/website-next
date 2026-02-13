import { StarRating } from '@components/star-rating'
import { getBooksForReadPage } from 'data/books.dto'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Library: Books - Chris Jarling',
  description: 'Books I have read.',
}

export default async function BooksPage() {
  const { currentlyReading, read: books, aborted } = await getBooksForReadPage()

  return (
    <>
      <div className="prose prose-invert mb-8">
        <h1>Books</h1>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8 flex justify-center">
        <div className="flex gap-8">
          <Link
            href="/library/books"
            className="border-b-2 border-accent-500 pb-2 text-base-100"
          >
            Read
          </Link>
          <Link
            href="/library/books/want-to-read"
            className="pb-2 text-base-400 hover:text-base-200"
          >
            Want to Read
          </Link>
        </div>
      </div>

      {/* Currently Reading Section */}
      {currentlyReading.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-base-400">
            Currently Reading
          </h2>
          <div className="rounded-lg border border-base-800/50 bg-base-900/30 p-2">
            <div className="space-y-2">
              {currentlyReading.map((book) => (
                <Link
                  key={book.slug}
                  href={`/library/books/${book.slug}`}
                  className="flex gap-4 rounded-md p-2 transition-all hover:bg-base-700/50"
                >
                  {/* Cover */}
                  <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded bg-base-800">
                    {book.entry.cover ? (
                      <Image
                        src={book.entry.cover}
                        alt={book.entry.title}
                        width={64}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center p-1 text-center text-xs text-base-600">
                        No cover
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-center">
                    <h3 className="font-medium text-base-300">
                      {book.entry.title}
                    </h3>
                    <p className="text-sm text-base-500">{book.entry.author}</p>
                    {book.entry.audiobook && (
                      <span className="mt-1 w-fit rounded bg-accent-950/50 px-1.5 py-0.5 text-xs text-accent-500">
                        Audiobook
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Read Books Section */}
      {books.length > 0 && currentlyReading.length > 0 && (
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-base-500">
          Finished
        </h2>
      )}

      {/* Book List */}
      <div className="space-y-4">
        {books.map((book) => (
          <Link
            key={book.slug}
            href={`/library/books/${book.slug}`}
            className="-ml-4 -mr-4 flex gap-4 rounded-md px-4 py-3 transition-all hover:bg-base-900/50"
          >
            {/* Cover */}
            <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded bg-base-800">
              {book.entry.cover ? (
                <Image
                  src={book.entry.cover}
                  alt={book.entry.title}
                  width={64}
                  height={96}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-1 text-center text-xs text-base-600">
                  No cover
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <h2 className="font-medium text-base-300">{book.entry.title}</h2>
              <p className="text-sm text-base-500">{book.entry.author}</p>
              <div className="mt-1 flex items-center gap-3 text-sm">
                <StarRating rating={book.entry.rating} />
                {book.entry.dateRead && (
                  <span className="text-base-600">{book.entry.dateRead}</span>
                )}
                {book.entry.audiobook && (
                  <span className="rounded bg-accent-950/50 px-1.5 py-0.5 text-xs text-accent-500">
                    Audiobook
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}

        {books.length === 0 && currentlyReading.length === 0 && (
          <p className="text-base-500">No books yet.</p>
        )}
      </div>

      {/* Aborted Books Section */}
      {aborted.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-base-500">
            Aborted
          </h2>
          <div className="space-y-4 opacity-50">
            {aborted.map((book) => (
              <Link
                key={book.slug}
                href={`/library/books/${book.slug}`}
                className="-ml-4 -mr-4 flex gap-4 rounded-md px-4 py-3 transition-all hover:bg-base-900/50"
              >
                {/* Cover */}
                <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded bg-base-800">
                  {book.entry.cover ? (
                    <Image
                      src={book.entry.cover}
                      alt={book.entry.title}
                      width={64}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-1 text-center text-xs text-base-600">
                      No cover
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center">
                  <h2 className="font-medium text-base-300">
                    {book.entry.title}
                  </h2>
                  <p className="text-sm text-base-500">{book.entry.author}</p>
                  <div className="mt-1 flex items-center gap-3 text-sm">
                    {book.entry.audiobook && (
                      <span className="rounded bg-accent-950/50 px-1.5 py-0.5 text-xs text-accent-500">
                        Audiobook
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
