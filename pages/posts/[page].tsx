import { GetStaticPropsContext, NextPageContext } from 'next'
import { Pagination } from '../../components/pagination'
import { PostsList } from '../../components/posts-list'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { BlogPost, getPaginatedEntries } from '../../lib/entries'

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const page = Number(params?.page) || 1
  const data = await getPaginatedEntries({ page, entryType: 'posts' })

  return {
    props: {
      ...data,
    },
  }
}

export async function getStaticPaths() {
  const { totalPages } = await getPaginatedEntries({
    page: 1,
    entryType: 'posts',
  })

  return {
    // Opt-in to on-demand generation for non-existent pages
    fallback: true,
    paths: [...Array(totalPages)].map((_, index) => ({
      params: {
        page: (index + 1).toString(),
      },
    })),
  }
}

type PostsIndexProps = {
  posts: BlogPost[]
  currentPage: number
  totalPages: number
  totalPostsCount: number
}

export default function PostsIndex({
  posts,
  currentPage,
  totalPages,
}: PostsIndexProps) {
  if (!posts) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <ErrorPage statusCode={404} />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Posts - Page {currentPage} - Chris Jarling</title>
      </Head>
      <PostsList posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        recordName="posts"
      />
    </>
  )
}
