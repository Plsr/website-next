import { compareDesc } from 'date-fns'

import { cms } from './cms'

export type ReadingNotes = Awaited<ReturnType<typeof cms.readingNotes.all>>
export type ReadingNote = ReadingNotes[number]

export async function getPaginatedArticles(
  page: number,
  pageSize: number = 10,
) {
  const allArticles = await cms.readingNotes.all()
  allArticles.sort((a, b) =>
    compareDesc(new Date(a.entry.createdAt), new Date(b.entry.createdAt)),
  )
  const totalArticles = allArticles.length
  const totalPages = Math.ceil(totalArticles / pageSize)

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const articles = allArticles.slice(startIndex, endIndex)

  return {
    articles,
    pagination: {
      currentPage: page,
      totalPages,
      totalArticles,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  }
}
