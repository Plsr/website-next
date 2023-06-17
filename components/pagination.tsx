import Link from 'next/link'
import { ReactNode } from 'react'

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
        <PaginationLink href={`/${recordName}/page/${currentPage + 1}`}>
          Older {recordName}
        </PaginationLink>
      )}
      {hasPreviousPages && (
        <PaginationLink href={`/${recordName}/page/${currentPage - 1}`}>
          Newer {recordName}
        </PaginationLink>
      )}
    </div>
  )
}

type PaginationLinkProps = {
  href: string
  children: ReactNode | ReactNode[]
}

const PaginationLink = ({ href, children }: PaginationLinkProps) => {
  return (
    <Link
      href={href}
      className="font-headline border-b-2 border-b-blue-500 hover:text-blue-500"
    >
      {children}
    </Link>
  )
}
