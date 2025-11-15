import { PostListItem } from 'components/post-list-item'
import { getPostsForTag } from 'data/posts.dto'
import { getAllTags } from 'data/tags.dto'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const tags = await getAllTags()

  return tags.map((tag) => ({
    id: tag.tagName,
  }))
}

type PostsIndexProps = {
  params: Promise<{ id: string }>
}

export default async function PostsIndex(props: PostsIndexProps) {
  const params = await props.params
  const tag = params.id
  const posts = await getPostsForTag(tag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <>
      <h2 className="prose dark:prose-invert flex items-center mb-8">
        <span className="text-xl font-bold block mr-2">
          All {posts.length} Posts tagged
        </span>
        #{tag}
      </h2>
      {posts.map((post) => {
        return (
          <PostListItem key={post.slug} post={post.entry} slug={post.slug} />
        )
      })}
    </>
  )
}
