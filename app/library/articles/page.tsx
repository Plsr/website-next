import { StyledArticleContent } from 'components/styled-article-content'
import { compareDesc, format } from 'date-fns'
import { Metadata } from 'next'
import Link from 'next/link'

import { allLibraryArticles } from '.contentlayer/generated'

export const metadata: Metadata = {
  title: 'Library: Articles - Chris Jarling',
  description: 'A list of links I read and found interesting.',
}

const ArticlesIndexPage = () => {
  const sortedLibraryArticles = allLibraryArticles.sort((a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
  )

  return (
    <>
      <div className="prose prose-invert mb-24">
        <h1>Article reading notes</h1>
        <p>Notes on articles I read and found interesting.</p>
      </div>

      {sortedLibraryArticles.map((libraryArticle) => (
        <Link
          href={`/library/articles/${libraryArticle.computedSlug}`}
          key={libraryArticle._id}
          className=" -ml-4 -mr-4 mb-2 py-2 px-4 rounded-md  flex flex-col md:flex-row md:items-center md:justify-between gap-x-6  hover:bg-base-900/50 hover:shadow-xs transition-all"
        >
          <h2 className="not-prose text-base-300">{libraryArticle.title}</h2>
          <span className="shrink-0 text-base-600">
            {format(new Date(libraryArticle.createdAt), 'do LLL, yyyy')}
          </span>
        </Link>
      ))}
    </>
  )
}

export default ArticlesIndexPage
