import Link from 'next/link'
import formatDistance from 'date-fns/formatDistance'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import useHover from '../lib/hooks/useHover'
import { useRouter } from 'next/router'
import ReadMoreLink from './read-more-link'

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
      className="pt-5 pb-6 px-4 cursor-pointer rounded-lg transition-all duration-500 hover:shadow-lg hover:bg-slate-800"
    >
      <small className="text-slate-500">{ago} ago</small>
      <h4 className="transition text-2xl mb-3 font-headline text-slate-200">
        {title}
      </h4>
      {excerpt && (
        <>
          <div
            className="text-slate-400"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </>
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
