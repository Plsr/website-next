import { Tag } from './tag'

type TagsListProps = {
  tags: string[]
} & JSX.IntrinsicElements['div']

export const TagsList = ({ tags, ...rest }: TagsListProps) => {
  return (
    <div {...rest} className="flex flex-wrap gap-x-1 gap-y-7">
      {tags.map((tag) => (
        <Tag key={tag} name={tag} />
      ))}
    </div>
  )
}
