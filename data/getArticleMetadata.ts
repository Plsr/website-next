import { allLibraryArticles } from 'content-collections'
import { compareDesc } from 'date-fns'
import { JSDOM } from 'jsdom'

export const getArticleMetadata = async () => {
  const sortedLibraryArticles = allLibraryArticles.sort((a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
  )

  const articlesWithMetadata = await Promise.all(
    sortedLibraryArticles.map(async (article) => {
      if (!article.link) {
        return {
          ...article,
          pageName: null,
          faviconHref: null,
        }
      }

      const url = new URL(article.link)
      const res = await fetch(article.link)
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
    }),
  )

  return articlesWithMetadata
}
