import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

type EntriesListHeaderProps = {
  collectionName: string
  newLink: string
}

export const EntriesListHeader = ({
  collectionName,
  newLink,
}: EntriesListHeaderProps) => {
  return (
    <div className="flex justify-between mb-8 align-center">
      <div>
        <Link href="/backoffice" className="flex items-center text-sm">
          <>
            <ArrowLeftIcon className="w-3 h-3 mr-2" />
            <span>Back</span>
          </>
        </Link>
        <h1 className="font-bold text-lg">All {collectionName}</h1>
      </div>
      <Link href={newLink}>
        <button className="rounded-lg border border-neutral-400 px-4 py-2 text-sm font-bold">
          + Create new
        </button>
      </Link>
    </div>
  )
}
