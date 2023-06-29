import { TagsList } from '../../components/tags-list'
import { getAllTags, Tag } from '../../lib/entries'

const TagsIndexPage = async () => {
  const tags = getAllTags()

  return (
    <>
      <h2 className="font-bold text-2xl mb-8">All tags ({tags.length})</h2>
      <TagsList tags={tags} />
    </>
  )
}

export default TagsIndexPage
