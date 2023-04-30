import { entry } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/router'

export type GeneralizedEntry = {
  id: number
  title: string
  created_at: Date
}

type EntriesListProps = {
  entries: GeneralizedEntry[]
  collectionPath: string
}
export const EntriesList = ({ entries, collectionPath }: EntriesListProps) => {
  const router = useRouter()
  const collectionName = router.query.collection!

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th>Title</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.title}</td>
            <td>{entry.created_at?.toString()}</td>
            <td>
              <Link href={`${collectionPath}/${entry.id}`}>
                <button className="rounded-lg border border-neutral-400 px-4 py-2 text-sm mr-2">
                  Edit
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
