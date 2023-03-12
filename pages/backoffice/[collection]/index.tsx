import { GetStaticPropsContext, NextPageContext } from 'next'
import { prisma } from '../../../lib/utill/db'
import { collection, entry } from '@prisma/client'
import Link from 'next/link'

export async function getStaticPaths() {
  const collections = await prisma.collection.findMany()
  const collectionNames = collections.map((collection) => collection.name)
  const paths = collectionNames.map((collectionName) => ({
    params: {
      collection: collectionName,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  console.log(context.params)
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

// TODO: Allow creating new entries here
export const CollectionDetialPage = ({
  collection,
  entries,
}: {
  collection: collection
  entries: entry[]
}) => {
  console.log(entries)
  return (
    <div>
      <h1>Here be the index site for {collection.name}</h1>
      <Link
        href={{
          pathname: '/backoffice/[collection]/new',
          query: { collection: collection.name },
        }}
      >
        <button>Create new {collection.name}</button>
      </Link>
    </div>
  )
}

export default CollectionDetialPage
