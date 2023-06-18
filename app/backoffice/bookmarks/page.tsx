import {
  EntriesList,
  GeneralizedEntry,
} from '../../../components/backoffice/entries-list'
import { prisma } from '../../../lib/utill/db'
import { EntriesListHeader } from '../../../components/backoffice/entries-list-header'

export default async function BookmarksBackofficePage() {
  const bookmarks = await getBookmarks()
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

const getBookmarks = async () => {
  const bookmarks = await prisma.bookmark.findMany({
    orderBy: { created_at: 'desc' },
  })

  return JSON.parse(JSON.stringify(bookmarks))
}
