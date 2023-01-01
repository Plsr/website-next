import { GetStaticPropsContext } from 'next'
import {
  BlogPost,
  getAllTags,
  getSortedAndFilteredEntries,
} from '../../lib/entries'
import { PostsList } from '../../components/posts-list'

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
    filterByTag: params?.tag as string,
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
      <h2 className="text-2xl font-headline mb-24">All Posts tagged #{tag} </h2>
      <PostsList posts={posts} expanded={false} />
    </>
  )
}
