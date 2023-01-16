import { Feed } from 'feed'
import { EntryType, getAllSortedEntries } from './entries'
import fs from 'fs'
import { getYear } from 'date-fns'
import { siteUrl } from './utill/site'

export const generateFeeds = async () => {
  await generateFeed('posts')
  await generateFeed('notes')
}

export const generateFeed = async (entryType: EntryType) => {
  const allPosts = await getAllSortedEntries(entryType)

  const currentYear = getYear(new Date())
  const updatedAt = new Date(allPosts[0].date)

  const feed = new Feed({
    title: `Chris Jarling - ${
      entryType.charAt(0).toUpperCase() + entryType.slice(1)
    }`,
    description: `All ${entryType} from chrisjarling.com`,
    id: `${siteUrl}`,
    link: `${siteUrl}`,
    language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: `${siteUrl}/memoji.png`,
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
      email: 'hi@chrisjarling.com',
      link: 'https://chrisjarling.com/about',
    },
  })

  allPosts.forEach((post) => {
    feed.addItem({
      title: post.title?.toString() || `Note from ${post.date}`,
      id: post.id,
      link: 'https://chrisjarling.com/' + entryType + '/' + post.id,
      description: post.contentHtml,
      content: post.contentHtml,
      author: [
        {
          name: 'Chris Jarling',
          email: 'hi@chrisjarling.com',
          link: 'https://chrisjarling.com/about',
        },
      ],
      date: new Date(post.date),
    })
  })

  fs.writeFileSync(`./public/${entryType}-rss.json`, feed.rss2())
  fs.writeFileSync(`./public/${entryType}-atom.xml`, feed.atom1())
}
