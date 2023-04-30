import { GetServerSidePropsContext, NextPage } from 'next'
import {
  EntriesList,
  GeneralizedEntry,
} from '../../../components/backoffice/entries-list'
import { prisma } from '../../../lib/utill/db'
import { bookmark } from '@prisma/client'
import { EntriesListHeader } from '../../../components/backoffice/entries-list-header'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const bookmarks = await prisma.bookmark.findMany({
    orderBy: { created_at: 'desc' },
  })

  return {
    props: {
      bookmarks: JSON.parse(JSON.stringify(bookmarks)),
    },
  }
}

const BookmarksBackofficePage = ({ bookmarks }: { bookmarks: bookmark[] }) => {
  return (
    <>
      <EntriesListHeader
        collectionName="bookmarks"
        newLink="/backoffice/bookmarks/new"
      />
      <EntriesList
        entries={bookmarks as GeneralizedEntry[]}
        collectionPath="/backoffice/bookmarks"
      />
    </>
  )
}

export default BookmarksBackofficePage
