import Divider from 'components/divider'
import { Note } from 'components/note'
import { PageTitleWithSubline } from 'components/page-title-with-subline'
import { Pagination } from 'components/pagination'
import { getPaginatedNotes } from 'lib/entries'

export const generateStaticParams = () => []

export async function generateMetadata(props: NotesIndexProps) {
  const params = await props.params
  const page = Number(params?.page) || 1
  return {
    title: `Notes - Page ${page} - Chris Jarling`,
  }
}

type NotesIndexProps = {
  params: Promise<{ page: string }>
}

export default async function NotesIndex(props: NotesIndexProps) {
  const params = await props.params
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
