import { BookmarkData } from './backoffice/bookmark-form'

type BookmarkItemProps = {
  bookmark: BookmarkData
}

export const BookmarkItem = ({ bookmark }: BookmarkItemProps) => {
  const { title, text, link } = bookmark

  const prettyUrl = new URL(link).hostname

  return (
    <a href={link} target="_blank" rel="noreferrer">
      <div className="p-4 bg-neutral-800 rounded-lg mb-8 hover:bg-neutral-700 transition">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="text-sm text-neutral-500">{prettyUrl}</span>
        {text && <div className="mt-4 text-sm">{text}</div>}
      </div>
    </a>
  )
}
