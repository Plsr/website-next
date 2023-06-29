import { getAllEntryIds, getEntryData } from 'lib/entries'
import { Note as NoteComponent } from 'components/note'
import { allNotes } from '.contentlayer/generated'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'

export async function generateStaticParams() {
  const notes = allNotes
  return notes.map((note) => ({
    params: { slug: note.slug },
  }))
}

export default async function Note({ params }: Props) {
  const note = allNotes.find((note) => note.slug === params.slug)

  if (!note) {
    return notFound()
  }

  return <NoteComponent note={note} asListItem={false} />
}

export async function generateMetadata({ params }: Props) {
  const note = allNotes.find((note) => note.slug === params.slug)

  if (!note) {
    throw new Error('Note not found')
  }

  const title = note.link
    ? `► ${note.headline?.toString() || note.link.toString()}`
    : note.headline?.toString() ||
      `Note from ${format(new Date(note.date), 'do LLL, yyyy')}`

  return {
    title: `${title} - Chris Jarling`,
    description: 'foo',
  }
}

type Props = {
  params: {
    slug: string
  }
}
