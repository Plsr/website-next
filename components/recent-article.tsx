import formatDistance from 'date-fns/formatDistance'
import useHover from '../lib/hooks/useHover'
import { useRouter } from 'next/router'
import ReadMoreLink from './read-more-link'
import styles from '../pages/posts/[id].module.css'
import { StyledArticleContent } from './styled-article-content'
import clsx from 'clsx'

export default function RecentArticle({ date, id, title, excerpt }: props) {
  const postDate = Date.parse(date)
  const ago = formatDistance(postDate, new Date())
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()
  const router = useRouter()

  const onPostClick = () => {
    router.push(`/post/${id}`)
  }

  return (
    <div
      ref={hoverRef}
      onClick={onPostClick}
      className="transition duration-300 cursor-pointer hover:bg-slate-100 -ml-4 p-4 rounded-xl"
    >
      <small className="text-slate-400 mb-2 block">{ago} ago</small>
      <h4
        className={clsx(
          'cursor-pointer transition duration-300 text-2xl font-semibold font-headline text-slate-900',
          isHovered && 'text-blue-500'
        )}
      >
        {title}
      </h4>
      {excerpt && (
        <StyledArticleContent
          style={{ color: 'rgb(100 116 139)' }}
          contentHtml={excerpt}
        />
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
