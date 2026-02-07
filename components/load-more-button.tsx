import { ArrowDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

type LoadMoreButtonProps = {
  nextPage: number
  basePath: string
}

export function LoadMoreButton({ nextPage, basePath }: LoadMoreButtonProps) {
  return (
    <div className="flex justify-center mt-8">
      <Link
        href={`${basePath}?page=${nextPage}`}
        className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-base-900 dark:text-base-100 bg-base-100 dark:bg-base-800 border border-base-300 dark:border-base-700 rounded-lg hover:bg-base-200 dark:hover:bg-base-700 transition-colors"
      >
        Load more
        <ArrowDownIcon className="w-5 h-5" />
      </Link>
    </div>
  )
}
