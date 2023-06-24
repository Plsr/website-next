import { getAllTags } from 'lib/entries'
import { PostsList } from 'components/posts-list'
import { Tag } from 'components/tag'
import { notFound } from 'next/navigation'
import { allPosts } from '.contentlayer/generated'

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    id: tag.tagName,
  }))
}

type PostsIndexProps = {
  params: { id: string }
}

export default async function PostsIndex({ params }: PostsIndexProps) {
  const tag = params.id
  const posts = allPosts.filter(
    (post) => post.tags && post.tags.split(' ').includes(tag)
  )

  if (posts.length === 0) {
    notFound()
  }

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
