import { getAllTags } from 'data/tags.dto'

import { TagsList } from '../../components/tags-list'

const TagsIndexPage = async () => {
  const tags = await getAllTags()

  return (
    <>
      <div className="prose dark:prose-invert">
        <h2 className="mb-8">All tags ({tags.length})</h2>
      </div>
      <TagsList tags={tags} />
    </>
  )
}

export default TagsIndexPage
