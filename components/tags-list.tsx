import { Tag as TagComponent } from './tag'
import type { Tag } from '../lib/entries'

type TagsListProps = {
  tags: Tag[]
} & JSX.IntrinsicElements['div']

export const TagsList = ({ tags, ...rest }: TagsListProps) => {
  return (
    <div {...rest} className="flex flex-wrap gap-x-4 gap-y-4">
      {tags.map((tag) => (
        <TagComponent
          key={tag.tagName}
          name={tag.tagName}
          timesUsed={tag.count}
        />
      ))}
    </div>
  )
}
