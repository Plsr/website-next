import { Post } from '.contentlayer/generated'
import { PostMetadata } from './post-metadata'
import Link from 'next/link'
import { BlogPostHeadline } from './blog-post-headline'
import { StyledArticleContent } from './styled-article-content'
import { Tag } from './tag'
import { Pagination } from './pagination'
import format from 'date-fns/format'

type Props = {
  posts: Post[]
}

export const PostsList = ({ posts }: Props) => {
  return (
    <>
      {posts.map((post) => (
        <div key={post.computedSlug} className="mb-24">
          <PostMetadata>
            {format(new Date(post.date), 'do LLL, yyyy')}
          </PostMetadata>
          <Link href={`/posts/${post.computedSlug}`}>
            <BlogPostHeadline
              title={post.title}
              draft={post.draft}
              className="mb-4"
            />
          </Link>
          <StyledArticleContent contentHtml={post.body.html} />
          <div className="space-x-2">
            {post.tags?.split(' ').map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
          <hr className="mt-24 w-4/5 mx-auto border-neutral-700" />
        </div>
      ))}
    </>
  )
}
