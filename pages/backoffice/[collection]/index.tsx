import { GetServerSidePropsContext } from 'next'
import { prisma } from '../../../lib/utill/db'
import { collection, entry } from '@prisma/client'
import Link from 'next/link'
import { EntriesList } from '../../../components/backoffice/entries-list'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const collectionName = context?.params?.collection as string

  if (!collectionName) {
    return { notFound: true }
  }

  const collection = await prisma.collection.findFirst({
    where: {
      name: collectionName,
    },
  })

  if (!collection) {
    return { notFound: true }
  }

  const entries = await prisma.entry.findMany({
    where: {
      collection_id: collection.id,
    },
  })

  return {
    props: {
      collection: JSON.parse(JSON.stringify(collection)),
      entries: JSON.parse(JSON.stringify(entries)),
    },
  }
}

export const CollectionDetialPage = ({
  collection,
  entries,
}: {
  collection: collection
  entries: entry[]
}) => {
  return (
    <div>
      <div className="flex justify-between mb-8 align-center">
        <div>
          <Link href={`/backoffice`} className="flex items-center text-sm">
            <>
              <ArrowLeftIcon className="w-3 h-3 mr-2" />
              <span>Back</span>
            </>
          </Link>
          <h1 className="font-bold text-lg">All {collection.name}</h1>
        </div>
        <Link
          href={{
            pathname: '/backoffice/[collection]/new',
            query: { collection: collection.name },
          }}
        >
          <button className="rounded-lg border border-neutral-400 px-4 py-2 text-sm font-bold">
            + Create new
          </button>
        </Link>
      </div>
      <EntriesList entries={entries} />
    </div>
  )
}

export default CollectionDetialPage
