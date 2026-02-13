import { cms } from './cms'

export async function getBooksForReadPage() {
  const books = await cms.books.all()

  const currentlyReading = books
    .filter((book) => book.entry.status === 'currently-reading')
    .sort((a, b) => a.entry.title.localeCompare(b.entry.title))

  const read = books
    .filter((book) => book.entry.status === 'read')
    .sort((a, b) => {
      // Sort by dateRead descending (newest first)
      if (!a.entry.dateRead) return 1
      if (!b.entry.dateRead) return -1

      return (
        new Date(b.entry.dateRead).getTime() -
        new Date(a.entry.dateRead).getTime()
      )
    })

  const aborted = books
    .filter((book) => book.entry.status === 'aborted')
    .sort((a, b) => a.entry.title.localeCompare(b.entry.title))

  return { currentlyReading, read, aborted }
}

export async function getWantToReadBooks() {
  const books = await cms.books.all()

  return books
    .filter((book) => book.entry.status === 'want-to-read')
    .sort((a, b) => a.entry.title.localeCompare(b.entry.title))
}

export async function getBookBySlug(slug: string) {
  return await cms.books.get(slug)
}
