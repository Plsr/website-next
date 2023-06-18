import { BookmarkData } from 'components/backoffice/bookmark-form'
import { BookmarkItem } from 'components/bookmark-item'
import { PageTitleWithSubline } from 'components/page-title-with-subline'
import { prisma } from 'lib/utill/db'
import { Metadata } from 'next'

export const dynamic = 'force-static'

type BookmarkApiData = BookmarkData & {
  id: number
}

export default async function BookmarksPage() {
  const bookmarks = await getBookmarks()

  return (
    <>
      <div>
        <PageTitleWithSubline
          title="Bookmarks"
          subline={
            <PageTitleWithSubline.Subline>
              Things around the web I liked
            </PageTitleWithSubline.Subline>
          }
        />
        {bookmarks.map((bookmark) => (
          <BookmarkItem key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </>
  )
}

export const metadata: Metadata = {
  title: 'Bookmarks - Chris Jarling',
}

const getBookmarks = async (): Promise<BookmarkApiData[]> => {
  const bookmarks = await prisma.bookmark.findMany({
    orderBy: { created_at: 'desc' },
  })
  return JSON.parse(JSON.stringify(bookmarks))
}
