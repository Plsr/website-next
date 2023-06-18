import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { BookmarkData, BookmarkForm } from 'components/backoffice/bookmark-form'
import { prisma } from 'lib/utill/db'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'

export default async function EntryDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const bookmark = await prisma.bookmark.findFirst({
    where: { id: parseInt(params.id) },
  })

  if (!bookmark) {
    notFound()
  }

  const { title, link, text } = bookmark

  const defaultValues = {
    title: title || undefined,
    link: link || undefined,
    text: text || undefined,
  }

  const handleSubmitClick = async (formData: BookmarkData) => {
    'use server'
    const result = await prisma.bookmark.update({
      where: {
        id: +params.id,
      },
      data: formData,
    })

    revalidatePath('/bookmarks')
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
