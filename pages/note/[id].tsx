import { GetStaticPropsContext } from 'next'
import { StyledArticleContent } from '../../components/styled-article-content'
import Head from 'next/head'
import { getAllEntryIds, getEntryData, NotePost } from '../../lib/entries'
import clsx from 'clsx'
import { PostMetadata } from '../../components/post-metadata'
import { BlogPostHeadline } from '../../components/blog-post-headline'
import { Note as NoteComponent } from '../../components/note'

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
  const getTitle = () => {
    if (noteData.link) {
      return `► ${noteData.headline?.toString() || noteData.link.toString()}`
    }

    return (
      noteData.headline?.toString() || `Note from ${noteData.formattedDate}`
    )
  }

  return (
    <>
      <Head>
        <title>{getTitle()} - Chris Jarling</title>
        <meta name="description" content={noteData.description} />
      </Head>
      <NoteComponent note={noteData} asListItem={false} />
    </>
  )
}

type props = {
  noteData: NotePost
}
