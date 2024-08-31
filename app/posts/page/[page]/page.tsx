import { ListBulletIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { PostsList } from 'components/posts-list'
import { Pagination } from 'components/pagination'
import { getPaginatedPosts } from 'lib/entries'
import Link from 'next/link'

type PaginatedPostPageProps = {
  params: { page: string }
}

export const generateStaticParams = () => []

export async function generateMetadata({ params }: PaginatedPostPageProps) {
  const page = Number(params?.page) || 1
  return {
    title: `Posts - Page ${page} - Chris Jarling`,
  }
}

export default async function PaginatedPostPage({
  params,
}: PaginatedPostPageProps) {
  const page = Number(params?.page) || 1

  const { posts, totalPages, currentPage } = getPaginatedPosts({
    page,
  })

  return (
    <>
      <PostsList posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        recordName="posts"
      />
    </>
  )
}
