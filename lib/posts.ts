import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remarkRehype from 'remark-rehype'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import rehypeStringify from 'rehype-stringify'
import rehypePrism from 'rehype-prism-plus'
import format from 'date-fns/format'

type MatterPostData = {
  title: string
  date: string
  formattedDate: string
  tags?: string
}

export type PostData = MatterPostData & {
  id: string
  excerpt?: string
  contentHtml: string
}

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getSortedPostsData({
  filterByTag = undefined,
}: {
  filterByTag?: string
}) {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.match(/\.md$/))

  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      const matterResult = matter(fileContents)

      let excerpt: string | undefined = matterResult.data.excerpt
      const file = await processFile(matterResult.content)

      const contentHtml = file.value.toString()

      if (!excerpt) {
        const processedContent = await processFile(matterResult.content)
        excerpt = processedContent.value.toString().substring(0, 300) + '...'
      }

      return {
        id,
        excerpt,
        contentHtml,
        ...(formattedFrontMatter(matterResult.data) as MatterPostData),
      }
    })
  )

  const sortedPostsData = allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })

  if (filterByTag) {
    return sortedPostsData.filter((postData) => {
      if (!postData.tags) return false

      const tagsList = postData.tags.split(' ')
      return tagsList.includes(filterByTag)
    })
  }

  return sortedPostsData
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const file = await processFile(matterResult.content)

  const contentHtml = file.value.toString()

  return {
    id,
    contentHtml,
    ...(formattedFrontMatter(matterResult.data) as MatterPostData),
  }
}
type GetPaginatedPostsParams = {
  page: number
  perPage?: number
  filterByTag?: string
}
export async function getPaginatedPosts({
  page,
  perPage = 10,
  filterByTag = undefined,
}: GetPaginatedPostsParams) {
  const allPosts = await getSortedPostsData({ filterByTag })
  const totalPages = allPosts.length / perPage

  const start = page > totalPages ? totalPages * perPage : page * perPage
  const end = start + perPage
  const posts = allPosts.slice(start, end)

  return {
    currentPage: page,
    totalPostsCount: allPosts.length,
    totalPages: totalPages,
    posts,
  }
}

type MatterResultData = {
  [key: string]: any
}

function formattedFrontMatter(matterResultData: MatterResultData) {
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
