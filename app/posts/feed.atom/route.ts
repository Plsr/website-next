import { getSortedPosts } from 'data/posts.dto'
import { generateFeed } from 'lib/feeds'

export async function GET() {
  const feed = generateFeed({
    entryType: 'posts',
    entries: getSortedPosts(),
  })

  return new Response(feed.atom1(), {
    headers: {
      'content-type': 'application/atom+xml; charset=utf-8',
      'cache-control': 'public, s-maxage=600, stale-while-revalidate=1800',
    },
  })
}
