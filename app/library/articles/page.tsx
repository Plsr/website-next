import { getArticleMetadata } from 'data/getArticleMetadata'
import { format } from 'date-fns'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Library: Articles - Chris Jarling',
  description: 'A list of links I read and found interesting.',
}

const ArticlesIndexPage = async () => {
  const articlesWithMetadata = await getArticleMetadata()

  return (
    <>
      <div className="prose prose-invert mb-24">
        <h1>Article reading notes</h1>
        <p>Notes on articles I read and found interesting.</p>
      </div>

      {articlesWithMetadata.map((libraryArticle) => (
        <Link
          href={`/library/articles/${libraryArticle.slug.toLowerCase()}`}
          key={libraryArticle.slug}
          className=" -ml-4 -mr-4 md:mb-2 mb-4 py-2 px-4 rounded-md  flex flex-col md:flex-row md:items-center md:justify-between gap-x-6  hover:bg-base-900/50 hover:shadow-xs transition-all"
        >
          <div>
            <h2 className="not-prose text-base-300">
              {libraryArticle.entry.title}
            </h2>
            {(libraryArticle.faviconHref || libraryArticle.pageName) && (
              <div className="flex items-center gap-x-2 mt-1 md:mb-0 mb-2">
                {libraryArticle.faviconHref && (
                  <img
                    src={libraryArticle.faviconHref}
                    alt={libraryArticle.entry.title}
                    className="w-4 h-4"
                  />
                )}
                <span className="text-xs text-base-600">
                  {libraryArticle.pageName}
                </span>
              </div>
            )}
          </div>
          <span className="shrink-0 text-base-600">
            {format(new Date(libraryArticle.entry.createdAt), 'do LLL, yyyy')}
          </span>
        </Link>
      ))}
    </>
  )
}

export default ArticlesIndexPage
