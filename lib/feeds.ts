import Markdoc from '@markdoc/markdoc'
import { Posts } from 'data/cms'
import { getYear } from 'date-fns'
import { Feed } from 'feed'

import { siteUrl } from './utill/site'

type GenerateFeedParams = {
  entries: Posts
}

export const generateFeed = async ({ entries }: GenerateFeedParams) => {
  const currentYear = getYear(new Date())
  const updatedAt = new Date(entries[0].entry.date)

  const feed = new Feed({
    title: 'Chris Jarling - Posts',
    description: `All posts from chrisjarling.com`,
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

  for (const entry of entries) {
    const { node } = await entry.entry.content()
    const ast = Markdoc.transform(node)
    const html = Markdoc.renderers.html(ast)

    feed.addItem({
      title: entry.entry.title,
      id: entry.slug,
      link: 'https://chrisjarling.com/posts/' + entry.slug,
      description: html,
      content: html,
      author: [
        {
          name: 'Chris Jarling',
          email: 'hi@chrisjarling.com',
          link: 'https://chrisjarling.com/about',
        },
      ],
      date: new Date(entry.entry.date),
    })
  }

  return feed
}
