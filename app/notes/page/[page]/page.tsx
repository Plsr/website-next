import Divider from 'components/divider'
import { Note } from 'components/note'
import { PageTitleWithSubline } from 'components/page-title-with-subline'
import { Pagination } from 'components/pagination'
import { getPaginatedNotes, NotePost } from 'lib/entries'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const { totalPages } = getPaginatedNotes({
    page: 1,
  })

  return [...Array(totalPages)].map((_, index) => ({
    page: (index + 1).toString(),
  }))
}

export async function generateMetadata({ params }: NotesIndexProps) {
  const page = Number(params?.page) || 1
  return {
    title: `Notes - Page ${page} - Chris Jarling`,
  }
}

type NotesIndexProps = {
  params: { page: string }
}

export default async function NotesIndex({ params }: NotesIndexProps) {
  const page = Number(params?.page) || 1

  const { posts, totalPages, currentPage } = getPaginatedNotes({
    page,
  })

  return (
    <>
      <ul>
        <div className="mb-24">
          <PageTitleWithSubline
            title="Notes"
            subline={
              <PageTitleWithSubline.Subline>
                Short updates about pretty much everything
              </PageTitleWithSubline.Subline>
            }
          />
        </div>
        {posts.map((note) => (
          <>
            <li key={note.url} className="mb-24">
              <Note note={note} />
            </li>
            <Divider />
          </>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        recordName="notes"
      />
    </>
  )
}
