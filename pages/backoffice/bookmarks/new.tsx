import { collection } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import { BookmarkForm } from '../../../components/backoffice/bookmark-form'
import {
  BookmarkData,
  createBookmark,
} from '../../../lib/data/bookmarksHandler'
import { prisma } from '../../../lib/utill/db'

export const CreateBookmarkPage = () => {
  const handleSubmitClick = async (formData: BookmarkData) => {
    await createBookmark({ ...formData })
  }

  return (
    <div>
      <h1 className="font-bold text-lg mb-4">Create new bookmark</h1>
      <BookmarkForm onSubmit={handleSubmitClick} />
    </div>
  )
}

export default CreateBookmarkPage
