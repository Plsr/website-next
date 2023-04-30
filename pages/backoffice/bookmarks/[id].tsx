import { bookmark, entry } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { BookmarkForm } from '../../../components/backoffice/bookmark-form'
import {
  BookmarkData,
  updateBookmark,
} from '../../../lib/data/bookmarksHandler'
import { prisma } from '../../../lib/utill/db'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const bookmarkId = context.params!.id!

  const bookmark = await prisma.bookmark.findFirst({
    where: { id: parseInt(bookmarkId as string) },
  })

  console.log(bookmark)

  if (!bookmark) {
    return { notFound: true }
  }

  return { props: { bookmark: JSON.parse(JSON.stringify(bookmark)) } }
}

type EntryDetailPageProps = {
  bookmark: bookmark
}

const EntryDetailPage = ({ bookmark }: EntryDetailPageProps) => {
  const { title, link, text } = bookmark

  const defaultValues = {
    title: title || undefined,
    link: link || undefined,
    text: text || undefined,
  }

  const handleSubmitClick = async (formData: BookmarkData) => {
    await updateBookmark(formData, bookmark.id)
  }

  return (
    <div>
      <Link className="text-sm flex items-center" href="/backoffice/bookmarks">
        <ArrowLeftIcon className="w-3 h-3 mr-2" />
        <span>Back</span>
      </Link>
      <h1 className="font-bold mb-4">Entry detail page</h1>
      <BookmarkForm
        onSubmit={handleSubmitClick}
        defaultValues={defaultValues}
      />
    </div>
  )
}

export default EntryDetailPage
