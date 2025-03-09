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
    <div className="prose dark:prose-invert">
      <h1>Article reading notes</h1>
      <p>Notes on articles I read and found interesting.</p>
      <div className="mb-24 prose" />
      {sortedLibraryArticles.map((libraryArticle) => (
        <div key={libraryArticle._id} className="mb-36">
          <h2>
            <a href={libraryArticle.link}>{libraryArticle.title}</a>
          </h2>
          <StyledArticleContent contentHtml={libraryArticle.body.html} />
          <Link
            href={`/library/articles/${libraryArticle.computedSlug}`}
            className="mt-4 block"
          >
            {format(new Date(libraryArticle.createdAt), 'do LLL, yyyy')}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ArticlesIndexPage
