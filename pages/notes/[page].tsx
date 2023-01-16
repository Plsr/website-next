import { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { PageTitleWithSubline } from '../../components/page-title-with-subline'
import { Pagination } from '../../components/pagination'
import { PostMetadata } from '../../components/post-metadata'
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
    fallback: false,
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
}: NotesIndexProps) {
  return (
    <>
      <Head>
        <title>Notes - Page {currentPage} - Chris Jarling</title>
      </Head>
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
          <li key={note.id} className="mb-24">
            <StyledArticleContent contentHtml={note.contentHtml} />
            <PostMetadata>
              <span>{note.formattedDate}</span> -{' '}
              <span>
                <Link
                  href={`/note/${note.id}`}
                  className="hover:border-b-2 hover:border-blue-500"
                >
                  Permalink
                </Link>
              </span>
            </PostMetadata>
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
