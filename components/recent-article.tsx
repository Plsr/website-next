import { StyledArticleContent } from './styled-article-content'
import clsx from 'clsx'
import Link from 'next/link'
import { format } from 'date-fns'

type Props = {
  date: string
  slug: string
  title: string
  excerpt?: string
}

export default function RecentArticle({ date, slug, title, excerpt }: Props) {
  const formattedDate = format(new Date(date), 'do LLL, yyyy')

  return (
    <Link
      href={`/posts/${slug}`}
      className="block transition duration-300 cursor-pointer  -ml-4 p-4 rounded-xl group"
    >
      <small className="text-gray-500 block">{formattedDate}</small>
      <h4
        className={clsx(
          'cursor-pointer transition text-lg duration-300 font-semibold mb-2 font-title group-hover:text-indigo-400'
        )}
      >
        {title}
      </h4>
      {excerpt && (
        <StyledArticleContent className="text-gray-400" contentHtml={excerpt} />
      )}
    </Link>
  )
}
