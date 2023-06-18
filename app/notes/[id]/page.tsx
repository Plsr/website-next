import { getAllEntryIds, getEntryData } from 'lib/entries'
import { Note as NoteComponent } from 'components/note'

export async function generateStaticParams() {
  const noteIds = getAllEntryIds('notes')
  return noteIds.map((id) => ({ params: { id } }))
}

export default async function Note({ params }: Props) {
  console.log('here')
  const noteData = await getEntryData(params!.id as string, 'notes')

  return <NoteComponent note={noteData} asListItem={false} />
}

export async function generateMetadata({ params }: Props) {
  const noteData = await getEntryData(params!.id as string, 'notes')
  const title = noteData.link
    ? `► ${noteData.headline?.toString() || noteData.link.toString()}`
    : noteData.headline?.toString() || `Note from ${noteData.formattedDate}`

  return {
    title: `${title} - Chris Jarling`,
    description: noteData.description,
  }
}

type Props = {
  params: {
    id: string
  }
}
