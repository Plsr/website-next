import { getWantToReadBooks } from 'data/books.dto'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Library: Books to Read - Chris Jarling',
  description: 'Books I want to read.',
}

export default async function WantToReadPage() {
  const books = await getWantToReadBooks()

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
            className="pb-2 text-base-400 hover:text-base-200"
          >
            Read
          </Link>
          <Link
            href="/library/books/want-to-read"
            className="border-b-2 border-accent-500 pb-2 text-base-100"
          >
            Want to Read
          </Link>
        </div>
      </div>

      {/* Book List */}
      <div className="space-y-2">
        {books.map((book) => (
          <div key={book.slug} className="-ml-4 -mr-4 rounded-md px-4 py-2">
            <h2 className="font-medium text-base-300">{book.entry.title}</h2>
            <p className="text-sm text-base-500">{book.entry.author}</p>
          </div>
        ))}

        {books.length === 0 && <p className="text-base-500">No books yet.</p>}
      </div>
    </>
  )
}
