import { Post } from 'content-collections'
import { getYear } from 'date-fns'
import { Feed } from 'feed'

import { EntryType } from './entries'
import { siteUrl } from './utill/site'

type GenerateFeedParams = {
  entryType: EntryType
  entries: Post[]
}

export const generateFeed = ({ entryType, entries }: GenerateFeedParams) => {
  const currentYear = getYear(new Date())
  const updatedAt = new Date(entries[0].date)

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

  entries.forEach((entry) => {
    feed.addItem({
      title: createTitle(entry),
      id: entry._id,
      link: 'https://chrisjarling.com/posts/' + entry.slug,
      description: entry.html,
      content: entry.html,
      author: [
        {
          name: 'Chris Jarling',
          email: 'hi@chrisjarling.com',
          link: 'https://chrisjarling.com/about',
        },
      ],
      date: new Date(entry.date),
    })
  })

  return feed
}

const createTitle = (entry: Post) => {
  return entry.title.toString()
}
