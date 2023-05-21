import { TagsList } from '../../components/tags-list'
import { getAllTags } from '../../lib/entries'

export async function getStaticProps() {
  const tags = await getAllTags('posts')

  return {
    props: {
      tags,
    },
  }
}

type TagsIndexPageProps = {
  tags: string[]
}

const TagsIndexPage = ({ tags }: TagsIndexPageProps) => {
  return (
    <>
      <h2 className="font-bold text-2xl mb-4">All tags ({tags.length})</h2>
      <TagsList tags={tags} />
    </>
  )
}

export default TagsIndexPage
