import { GetStaticPropsContext } from 'next'
import { StyledArticleContent } from '../../components/styled-article-content'
import Head from 'next/head'
import { getAllEntryIds, getEntryData, NotePost } from '../../lib/entries'

export async function getStaticPaths() {
  const noteIds = getAllEntryIds('notes')
  return {
    paths: noteIds.map((id) => ({ params: { id } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const noteData = await getEntryData(params!.id as string, 'notes')

  return {
    props: {
      noteData,
    },
  }
}

export default function Note({ noteData }: props) {
  return (
    <>
      <Head>
        <title>Note from {noteData.formattedDate} - Chris Jarling</title>
      </Head>
      <StyledArticleContent contentHtml={noteData.contentHtml} />
      <small className="text-slate-500 text-sm">{noteData.formattedDate}</small>
    </>
  )
}

type props = {
  noteData: NotePost
}
