import Link from 'next/link'
import { Button } from './button'

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

  return (
    <div className="flex justify-between">
      {hasNextPage && (
        <Link href={`/${recordName}/${currentPage + 1}`}>
          <Button>Older {recordName}</Button>
        </Link>
      )}
      {hasPreviousPages && (
        <Link href={`/${recordName}/${currentPage - 1}`}>
          <Button>Newer {recordName}</Button>
        </Link>
      )}
    </div>
  )
}
