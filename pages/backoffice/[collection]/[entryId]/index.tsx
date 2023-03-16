import { entry } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { BookmarkForm } from '../../../../components/backoffice/bookmark-form'
import {
  BookmarkData,
  updateBookmark,
} from '../../../../lib/data/bookmarksHandler'
import { prisma } from '../../../../lib/utill/db'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const entryId = context.params!.entryId!
  const collectionName = context.params!.collection!

  const entry = await prisma.entry.findFirst({
    where: { id: parseInt(entryId as string) },
  })

  if (!entry) {
    return { notFound: true }
  }

  return { props: { entry: JSON.parse(JSON.stringify(entry)), collectionName } }
}

type EntryDetailPageProps = {
  entry: entry
  collectionName: string
}

const EntryDetailPage = ({ entry, collectionName }: EntryDetailPageProps) => {
  const { title, link, text } = entry

  const defaultValues = {
    title: title || undefined,
    link: link || undefined,
    text: text || undefined,
  }

  const handleSubmitClick = async (formData: BookmarkData) => {
    await updateBookmark(formData, entry.id)
  }

  return (
    <div>
      <Link
        className="text-sm flex items-center"
        href={`/backoffice/${collectionName}`}
      >
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
