import { Note as NoteComponent } from 'components/note'
import { allNotes } from '.contentlayer/generated'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { Metadata } from 'next'

export const generateStaticParams = () => []

export default async function Note(props: Props) {
  const params = await props.params;
  const note = allNotes.find((note) => note.slug === params.slug)

  if (!note) {
    return notFound()
  }

  return <NoteComponent note={note} asListItem={false} />
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const note = allNotes.find((note) => note.slug === params.slug)

  if (!note) {
    throw new Error('Note not found')
  }

  const title = note.link
    ? `► ${note.headline?.toString() || note.link.toString()}`
    : note.headline?.toString() ||
      `Note from ${format(new Date(note.date), 'do LLL, yyyy')}`

  const fullTitle = `${title} - Chris Jarling`
  const description = note.body.raw.slice(0, 150)

  return {
    title: fullTitle,
    description: description,
    openGraph: {
      title: fullTitle,
      description,
      images: [
        {
          url: 'https://www.chrisjarling.com/og.jpg',
          secureUrl: 'https://www.chrisjarling.com/og.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

type Props = {
  params: Promise<{
    slug: string
  }>
}
