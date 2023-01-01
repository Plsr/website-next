import { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Pagination } from '../../components/pagination'
import { StyledArticleContent } from '../../components/styled-article-content'
import { getPaginatedEntries, NotePost } from '../../lib/entries'

// TODO:
// - Handle images somehow (might be needed in general for the blog)
export async function getStaticProps({ params }: GetStaticPropsContext) {
  const page = Number(params?.page) || 1
  const data = await getPaginatedEntries({ page, entryType: 'notes' })
  return {
    props: {
      ...data,
    },
  }
}

export async function getStaticPaths() {
  const totalPages = await getPaginatedEntries({ page: 1, entryType: 'notes' })

  return {
    // Opt-in to on-demand generation for non-existent pages
    fallback: true,
    paths: [...Array(totalPages)].map((_, index) => ({
      params: {
        page: (index + 1).toString(),
      },
    })),
  }
}

type NotesIndexProps = {
  posts: NotePost[]
  currentPage: number
  totalPages: number
  totalPostsCount: number
}

export default function NotesIndex({
  posts,
  currentPage,
  totalPages,
  totalPostsCount,
}: NotesIndexProps) {
  return (
    <>
      <Head>
        <title>Notes - Page {currentPage} - Chris Jarling</title>
      </Head>
      <ul>
        <div className="mb-24">
          <h2 className="font-headline text-3xl mb-2">Notes</h2>
          <p className="text-xl">Short updates about pretty much everything</p>
        </div>
        {posts.map((note) => (
          <li key={note.id} className="mb-24">
            <StyledArticleContent contentHtml={note.contentHtml} />
            <small>{note.formattedDate}</small> -{' '}
            <small>
              <Link href={`/note/${note.id}`}>Permalink</Link>
            </small>
          </li>
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
