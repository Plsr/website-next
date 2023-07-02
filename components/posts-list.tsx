import Link from 'next/link'
import { PostMetadata } from './post-metadata'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { Post } from '.contentlayer/generated'

type PostsListProps = {
  posts: Post[]
}

export const PostsList = ({ posts }: PostsListProps) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id} className="mb-2 ">
          <Link href={`/posts/${post.computedSlug}`}>
            <div className="flex flex-row justify-between group">
              <div className="flex flex-col mb-6 group-hover:translate-x-2 transition">
                <h2 className="text-gray-200 font-bold font-body">
                  {post.title}
                </h2>
                <PostMetadata>
                  {format(new Date(post.date), 'do LLL, yyyy')}
                </PostMetadata>
              </div>
              <ArrowRightIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition transition-600" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
