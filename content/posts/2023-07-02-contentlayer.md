---
title: Using Contentlayer
date: '2023-07-02T20:26:26.271Z'
excerpt: Contentlayer made dealing with markdown on this site a breeze.
tags: web-dev
slug: contentlayer
---

I recently migrated this website, which is powered by the great Next.js, over from the old pages router (spits on ground in disgust) over to the new app router.\
I do like the app router a lot. However, I came across a problem on the way. To be honest, it was more than just one problem (which is to be expected on any major migration), but this one was really severe: My content was not being rendered anymore.

This page is basically a bunch of markdown, which Next.js reads on build and converts to html, which you then can view in your browser. In the old version, I had a huge function written that was taking care of reading those markdown files over the file system, converting them based on which type of post (article or note) they were and then storing that as html. This was done once at build time, so the page was about 95% static content and very performant.\
Now, with the app router and React Server Components, some things changed and my function was now called on the server upon request and cached. That meant that the path in which it was called changed. That means, the functions was no longer able to find the files (additionally, they were not part of the bundle, so it had no chance to begin with).

That sucked. I thought about different solutions, from bundling all the markdown files to just getting rid of markdown altogether and storing everything in [supabase](https://supabase.com/). But one day I came across [Contentlayer](https://www.contentlayer.dev/) and that was a good day. Contentlayer just replaced the big ol' function I had for converting markdown to html. You just tell it where the markdown is and what fields you expect the files to have. And then you get out html, with a lot of convenience functions.

Here's an example of how my posts are configured in Contentlayer:

```ts
export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/*.md',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    tags: { type: 'string', required: false },
    excerpt: { type: 'string', required: false },
    series: { type: 'string', required: false },
    slug: { type: 'string', required: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    computedSlug: {
      type: 'string',
      resolve: (post) =>
        post.slug || post._raw.flattenedPath.replace('posts/', ''),
    },
  },
}))
```
Most of this is just type safety for the markdown front matter. If a post does not satisfy all required fields, it will not be processed and Contentlayer will print out a warning. This prevents me from breaking my site with malformed front matter on a post.

What's interesting are the computed fields. These can be pretty much everything you want to add to the post as an attribute after the file was read. In my case, I have an `url` which makes sure my links to posts have the same format everywhere and a `computedSlug` which uses either the defined slug from the front matter or generates one.

In `posts/page.tsx` I can then just use the method Contentlayer generates for every entry type you configure in the config. So for posts, this would be `allPosts`:

```tsx
import { allPosts } from '.contentlayer/generated'

export default async function PostsIndex() {
  return (
		<PostsList posts={allPosts} />
  )
}
```
_(Please not that this is a simplified version of the page. [Here's](https://github.com/Plsr/website-next/blob/874dc8294381045c6e1c793a308481227978a1ac/app/posts/page.tsx) the actual version as of time of this writing)._

All in all, I'm really pleased with effortless the setup was and how much more simple my code got using contentlayer.
