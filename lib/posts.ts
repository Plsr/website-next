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
}

export type PostData = {
  id: string
  title: string
  date: string
  excerpt?: string
  contentHtml: string
}

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getSortedPostsData() {
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

      if (!excerpt) {
        const processedContent = await processFile(matterResult.content)
        excerpt = processedContent.value.toString().substring(0, 300) + '...'
      }

      return {
        id,
        excerpt,
        ...(formattedFrontMatter(matterResult.data) as MatterPostData),
      }
    })
  )

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
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

type MatterResultData = {
  [key: string]: any
}

function formattedFrontMatter(matterResultData: MatterResultData) {
  const formattedDate = matterResultData.date
    ? format(new Date(matterResultData.date), 'do MMMM, yyyy')
    : matterResultData.date

  return {
    ...matterResultData,
    date: formattedDate,
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
