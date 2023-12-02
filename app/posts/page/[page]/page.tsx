import { ListBulletIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { BlogPostHeadline } from 'components/blog-post-headline'
import { Pagination } from 'components/pagination'
import { PostMetadata } from 'components/post-metadata'
import { StyledArticleContent } from 'components/styled-article-content'
import { Tag } from 'components/tag'
import { format } from 'date-fns'
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
      <div className="flex justify-end mb-6 space-x-6">
        <Link href="/posts" className="text-sm text-rose-500 flex items-center">
          <ListBulletIcon className="w-4 h-4 mr-2" /> List view
        </Link>
        <Link
          href="/posts/drafts"
          className="text-sm text-rose-500 flex itemx-center"
        >
          <PencilSquareIcon className="w-4 h-4 mr-2" /> Drafts
        </Link>
      </div>

      {posts.map((post) => (
        <div key={post.computedSlug} className="mb-24">
          <PostMetadata>
            {format(new Date(post.date), 'do LLL, yyyy')}
          </PostMetadata>
          <BlogPostHeadline
            title={post.title}
            draft={post.draft}
            className="mb-4"
          />
          <StyledArticleContent contentHtml={post.body.html} />
          <div className="space-x-2">
            {post.tags?.split(' ').map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
          <hr className="mt-24 w-4/5 mx-auto border-neutral-700" />
        </div>
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        recordName="posts"
      />
    </>
  )
}
