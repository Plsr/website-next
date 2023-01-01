import Link from 'next/link'
import { BlogPost } from '../lib/entries'
import Divider from './divider'
import { StyledArticleContent } from './styled-article-content'
import { TagsList } from './tags-list'
import clsx from 'clsx'

type PostsListProps = {
  posts: BlogPost[]
  expanded?: boolean
}

export const PostsList = ({ posts, expanded = true }: PostsListProps) => {
  return (
    <ul>
      {posts.map((post) => (
        <li
          key={post.id}
          className={clsx(expanded && 'mb-24', !expanded && 'mb-12')}
        >
          <Link href={`/post/${post.id}`}>
            <div
              className={clsx(
                'flex flex-col',
                expanded && 'mb-12',
                !expanded && 'mb-4'
              )}
            >
              <span className="text-sm text-slate-500 mb-2">
                {post.formattedDate}
              </span>
              <span
                className={clsx(
                  ' font-headline',
                  expanded && 'text-3xl',
                  !expanded && 'text-xl'
                )}
              >
                {post.title}
              </span>
            </div>
          </Link>
          {expanded && (
            <>
              <StyledArticleContent contentHtml={post.contentHtml} />
              {post.tags && (
                <TagsList className="mt-12" tags={post.tags?.split(' ')} />
              )}
              <Divider />
            </>
          )}
        </li>
      ))}
    </ul>
  )
}
