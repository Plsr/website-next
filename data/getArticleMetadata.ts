import { compareDesc } from 'date-fns'
import { JSDOM } from 'jsdom'

import { cms } from './cms'

export const getArticleMetadata = async () => {
  const allLibraryArticles = await cms.readingNotes.all()
  const sortedLibraryArticles = allLibraryArticles.sort((a, b) =>
    compareDesc(new Date(a.entry.createdAt), new Date(b.entry.createdAt)),
  )

  const articlesWithMetadata = await Promise.all(
    sortedLibraryArticles.map(async (article) => {
      if (!article.entry.link) {
        return {
          ...article,
          pageName: null,
          faviconHref: null,
        }
      }

      const url = new URL(article.entry.link)

      try {
        const res = await fetch(article.entry.link)
        const data = await res.text()
        const dom = new JSDOM(data)
        const title = url.host.replace('www.', '')
        const faviconElement = dom.window.document.querySelectorAll(
          'link[rel="shortcut icon"],link[rel="icon"]',
        )[0]

        const faviconHref = (faviconElement as HTMLLinkElement)?.href

        return {
          ...article,
          pageName: title,
          faviconHref,
        }
      } catch (e) {
        console.log('Error fetching favicon for ', article.entry.link)
        console.log(e)

        return {
          ...article,
          pageName: null,
          faviconHref: null,
        }
      }
    }),
  )

  return articlesWithMetadata
}
