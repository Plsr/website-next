import { ArrowLeft, ArrowRight } from 'lucide-react'

type Props = {
  currentPage: number
  totalPages: number
}

export const Pagination = ({ currentPage, totalPages }: Props) => {
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < totalPages
  return (
    <div className="flex items-center justify-between gap-4">
      {hasPrevious && (
        <a
          className="flex items-center gap-2 transition-all dark:text-base-500 dark:hover:bg-base-800 dark:hover:text-base-200 px-4 py-2 rounded-full"
          href={`/posts/page/${currentPage - 1}`}
        >
          <ArrowLeft className="h-4 w-4" />
          Newer
        </a>
      )}
      {hasNext && (
        <a
          className="flex items-center gap-2 ml-auto transition-all dark:text-base-500 dark:hover:bg-base-800 dark:hover:text-base-200 px-4 py-2 rounded-full"
          href={`/posts/page/${currentPage + 1}`}
        >
          Older
          <ArrowRight className="h-4 w-4" />
        </a>
      )}
    </div>
  )
}
