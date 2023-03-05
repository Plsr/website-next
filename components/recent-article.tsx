import formatDistance from 'date-fns/formatDistance'
import { useRouter } from 'next/router'
import { StyledArticleContent } from './styled-article-content'
import clsx from 'clsx'

export default function RecentArticle({ date, id, title, excerpt }: props) {
  const postDate = Date.parse(date)
  const ago = formatDistance(postDate, new Date())
  const router = useRouter()

  const onPostClick = () => {
    router.push(`/post/${id}`)
  }

  return (
    <div
      onClick={onPostClick}
      className="transition duration-300 cursor-pointer hover:bg-zinc-700 -ml-4 p-4 rounded-xl"
    >
      <small className="text-gray-500 mb-2 block">{ago} ago</small>
      <h4
        className={clsx(
          'cursor-pointer transition text-lg duration-300 font-semibold mb-2'
        )}
      >
        {title}
      </h4>
      {excerpt && (
        <StyledArticleContent className="text-gray-400" contentHtml={excerpt} />
      )}
    </div>
  )
}

type props = {
  date: string
  id: string
  title: string
  excerpt?: string
}
