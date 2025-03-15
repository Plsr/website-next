import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'

type PaginationProps = {
  currentPage: number
  totalPages: number
  recordName: string
}

export const Pagination = ({
  currentPage,
  totalPages,
  recordName,
}: PaginationProps) => {
  const hasNextPage = currentPage < totalPages
  const hasPreviousPages = currentPage > 1

  const baseClass =
    'transition-all dark:text-base-500 dark:hover:bg-base-800 dark:hover:text-base-200 px-4 py-2 rounded-full'

  return (
    <div className="flex justify-between">
      {hasPreviousPages && (
        <Link
          href={`/${recordName}/page/${currentPage - 1}`}
          className={baseClass}
        >
          <div className="flex items-center gap-2">
            <ArrowLeftIcon className="w-3 h-3" />
            Newer {recordName}
          </div>
        </Link>
      )}
      {hasNextPage && (
        <Link
          href={`/${recordName}/page/${currentPage + 1}`}
          className={clsx(baseClass, 'ml-auto')}
        >
          <div className="flex items-center gap-2">
            Older {recordName}
            <ArrowRightIcon className="w-3 h-3" />
          </div>
        </Link>
      )}
    </div>
  )
}
