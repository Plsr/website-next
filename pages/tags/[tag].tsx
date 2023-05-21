import { GetStaticPropsContext } from 'next'
import {
  BlogPost,
  filterByTag,
  getAllTags,
  getSortedAndFilteredEntries,
} from '../../lib/entries'
import { PostsList } from '../../components/posts-list'
import { Tag } from '../../components/tag'

export async function getStaticPaths() {
  const tags = await getAllTags('posts')
  const paths = tags.map((tag) => ({
    params: { tag },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const posts = await getSortedAndFilteredEntries({
    filterString: params!.tag as string,
    filterFunction: filterByTag,
    entryType: 'posts',
  })

  return {
    props: {
      tag: params?.tag,
      posts,
    },
  }
}

type PostsIndexProps = {
  posts: BlogPost[]
  tag: string
}

export default function PostsIndex({ posts, tag }: PostsIndexProps) {
  return (
    <>
      <h2 className="text-xl font-body font-bold mb-8 flex items-center">
        <span className="block mr-2">All {posts.length} Posts tagged</span>
        <Tag.Pill hover={false}>#{tag}</Tag.Pill>
      </h2>
      <PostsList posts={posts} />
    </>
  )
}
