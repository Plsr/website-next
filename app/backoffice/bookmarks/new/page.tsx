import { BookmarkData, BookmarkForm } from 'components/backoffice/bookmark-form'
import { prisma } from 'lib/utill/db'
import { revalidatePath } from 'next/cache'

export default async function CreateBookmarkPage() {
  const handleSubmitClick = async (formData: BookmarkData) => {
    'use server'
    const result = await prisma.bookmark.create({
      data: formData,
    })

    revalidatePath('/bookmarks')
  }

  return (
    <div>
      <h1 className="font-bold text-lg mb-4">Create new bookmark</h1>
      <BookmarkForm onSubmit={handleSubmitClick} />
    </div>
  )
}
