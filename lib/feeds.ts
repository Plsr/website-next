import { Feed } from 'feed'
import { EntryType } from './entries'
import { getYear } from 'date-fns'
import { siteUrl } from './utill/site'
import { Note, Post } from '.contentlayer/generated'

type GenerateFeedParams = {
  entryType: EntryType
  entries: Post[] | Note[]
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
      link: 'https://chrisjarling.com/' + entry.url,
      description: entry.body.html,
      content: entry.body.html,
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

const createTitle = (entry: Post | Note) => {
  if (entry.type === 'Post') {
    return entry.title.toString()
  }

  if (entry.link) {
    return `► ${entry.headline?.toString() || entry.link.toString()}`
  }

  return entry.headline?.toString() || entry.title.toString()
}
