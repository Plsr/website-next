import Link from 'next/link'
import { PostData } from '../lib/posts'
import Divider from './divider'
import { StyledArticleContent } from './styled-article-content'
import { TagsList } from './tags-list'

type PostsListProps = {
  posts: PostData[]
}

export const PostsList = ({ posts }: PostsListProps) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="mb-24">
          <Link href={`/posts/${post.id}`}>
            <div className="flex flex-col mb-8 ">
              <span className="mb-2 text-sm text-slate-500">
                {post.formattedDate}
              </span>
              <span className="text-3xl font-headline">{post.title}</span>
            </div>
          </Link>
          <StyledArticleContent contentHtml={post.contentHtml} />
          {post.tags && (
            <TagsList className="mt-12" tags={post.tags?.split(' ')} />
          )}
          <Divider />
        </li>
      ))}
    </ul>
  )
}
