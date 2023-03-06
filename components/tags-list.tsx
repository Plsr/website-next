import Link from 'next/link'

type TagsListProps = {
  tags: string[]
} & JSX.IntrinsicElements['div']

export const TagsList = ({ tags, ...rest }: TagsListProps) => {
  return (
    <div {...rest}>
      {tags.map((tag) => (
        <Link key={tag} href={`/tags/${tag}`}>
          <span className="mr-4 hover:border-b-2 hover:border-blue-500 hover:text-blue-500">
            #{tag}
          </span>
        </Link>
      ))}
    </div>
  )
}
