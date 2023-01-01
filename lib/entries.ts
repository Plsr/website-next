import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism-plus'
import rehypeStringify from 'rehype-stringify'
import format from 'date-fns/format'

type MatterData = {
  title: string
  date: string
  formattedDate: string
  tags?: string
}

export type NotePost = Omit<MatterData, 'title'> & {
  id: string
  contentHtml: string
}

export type BlogPost = MatterData & {
  id: string
  excerpt?: string
  contentHtml: string
}

type EntryType = 'posts' | 'notes'
type EntryTypeWithTags = 'posts'

export type EntryPostTypesMap = {
  posts: BlogPost
  notes: NotePost
}

const getEntriesDirectory = (entryType: EntryType) =>
  path.join(process.cwd(), entryType)

type GetPaginatedEntriesParams<T extends EntryType> = {
  entryType: T
  page: number
  perPage?: number
}

export const getPaginatedEntries = async <T extends EntryType>({
  page,
  perPage = 10,
  entryType,
}: GetPaginatedEntriesParams<T>) => {
  const allNotes = await getAllSortedEntries(entryType)
  const totalPages = allNotes.length / perPage

  // We want to hanlde the calculation on a zero-based pages array,
  // we're not barbarians.
  const normalizedPage = page - 1

  const start =
    normalizedPage > totalPages
      ? totalPages * perPage
      : normalizedPage * perPage
  const end = start + perPage
  const posts = allNotes.slice(start, end)

  return {
    currentPage: page,
    totalPostsCount: allNotes.length,
    totalPages: totalPages,
    posts,
  }
}

export const getAllEntryIds = (entryType: EntryType): string[] => {
  const entriesDirectory = getEntriesDirectory(entryType)
  const fileNames = fs.readdirSync(entriesDirectory)
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''))
}

export const getAllTags = async (entryType: EntryTypeWithTags) => {
  const allPosts = await getAllEntries(entryType)
  const allTags: string[] = []

  allPosts.forEach((post) => {
    const tags = post?.tags?.split(' ')
    tags && tags.length > 0 && allTags.push(...tags)
  })

  return allTags
}

export const getAllSortedEntries = async <T extends EntryType>(
  entryType: T
): Promise<EntryPostTypesMap[T][]> => {
  const allEntries = await getAllEntries(entryType)
  const sortedEntries = allEntries.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })

  return sortedEntries
}

export const getEntryData = async <T extends EntryType>(
  id: string,
  entryType: T
): Promise<EntryPostTypesMap[T]> => {
  const entriesDirectory = getEntriesDirectory(entryType)
  const fullPath = path.join(entriesDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const file = await processFile(matterResult.content)

  const contentHtml = file.value.toString()

  return {
    id,
    contentHtml,
    ...formattedFrontMatter(matterResult.data as MatterData),
  }
}

const getAllEntries = async <T extends EntryType>(
  entryType: T
): Promise<EntryPostTypesMap[T][]> => {
  const entriesDirectory = getEntriesDirectory(entryType)

  const fileNames = fs
    .readdirSync(entriesDirectory)
    .filter((fileName) => fileName.match(/\.md$/))

  const allEntriesData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(entriesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      const matterResult = matter(fileContents)
      console.log(matterResult)
      const file = await processFile(matterResult.content)

      let excerpt: string | undefined = matterResult.data.excerpt

      if (!excerpt && entryType === 'posts') {
        const processedContent = await processFile(matterResult.content)
        excerpt = processedContent.value.toString().substring(0, 300) + '...'
      }

      const contentHtml = file.value.toString()

      return {
        id,
        contentHtml,
        ...(excerpt && { excerpt }),
        ...formattedFrontMatter(matterResult.data as MatterData),
      }
    })
  )

  return allEntriesData
}

function formattedFrontMatter(matterResultData: MatterData) {
  const formattedDate = matterResultData.date
    ? format(new Date(matterResultData.date), 'do MMMM, yyyy')
    : matterResultData.date

  return {
    ...matterResultData,
    formattedDate,
  }
}

async function processFile(content: string) {
  return await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(content)
}
