import { Post } from '.contentlayer/generated'
import { PostMetadata } from './post-metadata'
import Link from 'next/link'
import { BlogPostHeadline } from './blog-post-headline'
import { StyledArticleContent } from './styled-article-content'
import { Tag } from './tag'
import format from 'date-fns/format'
import { getAllSortedPosts } from 'lib/entries'
import { getYear } from 'date-fns'
import { notFound } from 'next/navigation'
import { PostListItem } from './post-list-item'

type Props = {
  posts: Post[]
}

type PostsByYear = {
  [key: number]: Post[]
}

const getPostsByYear = () => {
  const data = getAllSortedPosts()
  const postsByYear: PostsByYear = {}

  data.forEach((page) => {
    const year = getYear(new Date(page.date))

    if (!postsByYear[year]) {
      postsByYear[year] = [page]
      return
    }
    postsByYear[year].push(page)
  })

  return postsByYear
}

export const PostsList = () => {
  const postsByYear = getPostsByYear()

  if (!postsByYear) {
    notFound()
  }

  const sortedPostsByYears = Object.entries(postsByYear)
    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
    .map((e) => e)

  return (
    <div className="prose dark:prose-invert">
      {sortedPostsByYears.map(([year, posts]) => (
        <div className="mb-16 not-prose" key={year}>
          <div className="flex flex-row items-center mb-6">
            <h2 className="font-headline text-xl text-neutral-800 mr-4">
              {year}
            </h2>
          </div>
          {posts.map((post) => (
            <PostListItem post={post} key={post._id} />
          ))}
        </div>
      ))}
    </div>
  )
}
