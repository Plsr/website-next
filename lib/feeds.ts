import { Feed } from 'feed'
import { getAllSortedEntries } from './entries'
import fs from 'fs'
import { getYear } from 'date-fns'

export const generateFeed = async () => {
  const siteUrl =
    process.env.NODE_ENV === 'development'
      ? 'localhost:3000'
      : 'https://chrisjarling.com'
  const allPosts = await getAllSortedEntries('posts')

  const currentYear = getYear(new Date())
  const updatedAt = new Date(allPosts[0].date)

  const feed = new Feed({
    title: 'Chris Jarling - Posts',
    description: 'All posts from chrisjarling.com',
    id: `${siteUrl}`,
    link: `${siteUrl}`,
    language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: `${siteUrl}/image.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${currentYear}, Chris Jarling`,
    updated: updatedAt, // optional, default = today
    generator: 'awesome', // optional, default = 'Feed for Node.js'
    feedLinks: {
      json: `${siteUrl}/json`,
      atom: `${siteUrl}/atom`,
    },
    author: {
      name: 'Chris Jarling',
      email: 'hello@chrisjarling.com',
      link: 'https://chrisjarling.com/about',
    },
  })

  allPosts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.id,
      link: 'https://chrisjarling.com/posts/' + post.id,
      description: post.excerpt,
      content: post.contentHtml,
      author: [
        {
          name: 'Chris Jarling',
          email: 'hello@chrisjarling.com',
          link: 'https://chrisjarling.com/about',
        },
      ],
      date: new Date(post.date),
    })
  })

  fs.writeFileSync('./public/rss.json', feed.rss2())
  fs.writeFileSync('./public/atom.xml', feed.atom1())
}
