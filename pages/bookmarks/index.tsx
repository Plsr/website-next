import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { BookmarkItem } from '../../components/bookmark-item'
import { PageTitleWithSubline } from '../../components/page-title-with-subline'
import { BookmarkData } from '../../lib/data/bookmarksHandler'
import { prisma } from '../../lib/utill/db'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const bookmarksCollectionId = await prisma.collection.findFirstOrThrow({
    where: { name: 'bookmarks' },
  })

  const bookmarks = await prisma.entry.findMany({
    where: { collection_id: bookmarksCollectionId.id },
    orderBy: { created_at: 'desc' },
  })

  return {
    props: {
      bookmarks: JSON.parse(JSON.stringify(bookmarks)),
    },
  }
}

type BookmarkApiData = BookmarkData & {
  id: number
}

type BookmarksPageProps = {
  bookmarks: BookmarkApiData[]
}

const BookmarksPage = ({ bookmarks = [] }: BookmarksPageProps) => {
  return (
    <>
      <Head>
        <title>Bookmarks - Chris Jarling</title>
      </Head>
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

export default BookmarksPage
