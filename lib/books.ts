import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism-plus'
import rehypeStringify from 'rehype-stringify'
import rehypeFigure from 'rehype-figure'
import format from 'date-fns/format'

export type BookFrontMatter = {
  title: string
  author: string
  startedAt: string
  finishedAt?: string
  tags?: string[]
  audiobook: boolean
}

export type Book = BookFrontMatter & {
  id: string
  notes: string
}

const booksPath = path.join(process.cwd(), 'books')

export const getBooks = async () => {
  const fileNames = fs
    .readdirSync(booksPath)
    .filter((fileName) => fileName.match(/\.md$/))

  const allEntriesData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(booksPath, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      const matterResult = matter(fileContents)
      const file = await processFile(matterResult.content)

      const processedContent = await processFile(matterResult.content)

      let description =
        processedContent.value.toString().substring(0, 152) + '...'

      const contentHtml = file.value.toString()

      return {
        id,
        notes: contentHtml,
        ...formattedFrontMatter(matterResult.data as BookFrontMatter),
      } as Book
    })
  )

  return allEntriesData
}

function formattedFrontMatter(matterResultData: BookFrontMatter) {
  const formattedStartedAt = matterResultData.startedAt
    ? format(new Date(matterResultData.startedAt), 'do MMMM, yyyy')
    : matterResultData.startedAt

  const formattedFinishedAt = matterResultData.finishedAt
    ? format(new Date(matterResultData.finishedAt), 'do MMMM, yyyy')
    : matterResultData.finishedAt
  return {
    ...matterResultData,
    formattedStartedAt,
    formattedFinishedAt,
  }
}

async function processFile(content: string) {
  return await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFigure, { className: 'article-figure' })
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(content)
}
