import formatDistance from 'date-fns/formatDistance'
import useHover from '../lib/hooks/useHover'
import { useRouter } from 'next/router'
import ReadMoreLink from './read-more-link'
import styles from '../pages/posts/[id].module.css'
import { StyledArticleContent } from './styled-article-content'

export default function RecentArticle({ date, id, title, excerpt }: props) {
  const postDate = Date.parse(date)
  const ago = formatDistance(postDate, new Date())
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()
  const router = useRouter()

  const onPostClick = () => {
    router.push(`/posts/${id}`)
  }

  return (
    <div
      ref={hoverRef}
      onClick={onPostClick}
      className="pt-5 pb-6 px-4 cursor-pointer rounded-lg transition-all duration-500 shadow-lg bg-slate-800"
    >
      <small className="text-slate-500">{ago} ago</small>
      <h4 className="transition text-2xl mb-3 font-headline text-slate-200">
        {title}
      </h4>
      {excerpt && (
        <StyledArticleContent
          style={{ color: 'rgb(148 163 184)' }}
          contentHtml={excerpt}
        />
      )}
      <ReadMoreLink text="Read more" isHovered={isHovered} withArrow />
    </div>
  )
}

type props = {
  date: string
  id: string
  title: string
  excerpt?: string
}
