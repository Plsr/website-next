import { collection } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import { BookmarkForm } from '../../../components/backoffice/bookmark-form'
import {
  BookmarkData,
  createBookmark,
} from '../../../lib/data/bookmarksHandler'
import { prisma } from '../../../lib/utill/db'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const collectionName = context?.params?.collection as string

  if (!collectionName) {
    return {
      notFound: true,
    }
  }

  const collection = await prisma.collection.findFirst({
    where: {
      name: collectionName,
    },
  })

  if (!collection) {
    return {
      notFound: true,
    }
  }

  return {
    props: { collection: JSON.parse(JSON.stringify(collection)) },
  }
}
type CreateCollectionEntryProps = {
  collection: collection
}

export const CreateCollectionEntry = ({
  collection,
}: CreateCollectionEntryProps) => {
  const handleSubmitClick = async (formData: BookmarkData) => {
    await createBookmark({ ...formData, collectionId: collection.id })
  }

  return (
    <div>
      <h1 className="font-bold text-lg mb-4">Create new {collection.name}</h1>
      <BookmarkForm onSubmit={handleSubmitClick} />
    </div>
  )
}

export default CreateCollectionEntry
