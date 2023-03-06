import { GetStaticPropsContext, NextPageContext } from 'next'
import { Pagination } from '../../components/pagination'
import { PostsList } from '../../components/posts-list'
import Head from 'next/head'
import ErrorPage from 'next/error'

import {
  BlogPost,
  getAllSortedEntries,
  getPaginatedEntries,
} from '../../lib/entries'
import { getYear, parse, parseISO, toDate } from 'date-fns'

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const data = await getAllSortedEntries('posts')
  const postsByYear: PostsByYear = {}

  data.forEach((page) => {
    const year = getYear(new Date(page.date))

    if (!postsByYear[year]) {
      postsByYear[year] = [page]
      return
    }
    postsByYear[year].push(page)
  })

  return {
    props: {
      postsByYear,
    },
  }
}

// export async function getStaticPaths() {
//   const { totalPages } = await getPaginatedEntries({
//     page: 1,
//     entryType: 'posts',
//   })

//   return {
//     // Opt-in to on-demand generation for non-existent pages
//     fallback: true,
//     paths: [...Array(totalPages)].map((_, index) => ({
//       params: {
//         page: (index + 1).toString(),
//       },
//     })),
//   }
// }
type PostsByYear = {
  [key: number]: BlogPost[]
}

type PostsIndexProps = {
  postsByYear: PostsByYear
}

export default function PostsIndex({ postsByYear }: PostsIndexProps) {
  if (!postsByYear) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <ErrorPage statusCode={404} />
      </>
    )
  }

  const sortedPostsByYears = Object.entries(postsByYear)
    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
    .map((e) => e)

  return (
    <>
      <Head>
        <title>Posts - Chris Jarling</title>
      </Head>
      {sortedPostsByYears.map(([year, posts]) => (
        <div className="mb-16" key={year}>
          <div className="flex flex-row items-center mb-6">
            <h2 className="font-headline text-xl text-neutral-300 mr-4">
              {year}
            </h2>
            <div className="h-1 w-full border-b border-b-neutral-600" />
          </div>
          <PostsList posts={posts} />
        </div>
      ))}
    </>
  )
}
