import Link from 'next/link'

type TagsListProps = {
  tags: string[]
} & JSX.IntrinsicElements['div']

export const TagsList = ({ tags, ...rest }: TagsListProps) => {
  return (
    <div {...rest}>
      {tags.map((tag) => (
        <Link key={tag} href={`/tags/${tag}`}>
          <span className="mr-4 px-4 py-2 bg-slate-800 rounded-xl">#{tag}</span>
        </Link>
      ))}
    </div>
  )
}
