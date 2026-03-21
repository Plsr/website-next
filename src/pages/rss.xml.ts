import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: 'Chris Jarling',
    description: 'Personal blog of Chris Jarling',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.link ? `${post.data.title} →` : post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt,
      link: post.data.link ?? `/posts/${post.id}/`,
    })),
  });
}
