import Divider from 'components/divider'
import { Note } from 'components/note'
import { PageTitleWithSubline } from 'components/page-title-with-subline'
import { Pagination } from 'components/pagination'
import { getPaginatedEntries, NotePost } from 'lib/entries'

export async function generateStaticParams() {
  const { totalPages } = await getPaginatedEntries({
    page: 1,
    entryType: 'notes',
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

  const { posts, totalPages, currentPage } = await getPaginatedEntries({
    page,
    entryType: 'notes',
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
            <li key={note.id} className="mb-24">
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
