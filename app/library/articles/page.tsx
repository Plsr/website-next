import { allLibraryArticles } from '.contentlayer/generated'
import { PageTitleWithSubline } from 'components/page-title-with-subline'
import { StyledArticleContent } from 'components/styled-article-content'
import { compareDesc, format } from 'date-fns'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Library: Articles - Chris Jarling',
  description: 'A list of links I read and found interesting.',
}

const ArticlesIndexPage = () => {
  const sortedLibraryArticles = allLibraryArticles.sort((a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt))
  )

  return (
    <>
      <PageTitleWithSubline
        title="Article notes"
        subline={
          <PageTitleWithSubline.Subline>
            Notes on articles I read and found interesting.
          </PageTitleWithSubline.Subline>
        }
      />
      <div className="mb-24" />
      {sortedLibraryArticles.map((libraryArticle) => (
        <div key={libraryArticle._id} className="mb-36">
          <h2 className="underline text-lg mb-4">
            <a href={libraryArticle.link}>{libraryArticle.title}</a>
          </h2>
          <StyledArticleContent contentHtml={libraryArticle.body.html} />
          <Link
            href={`/library/articles/${libraryArticle.computedSlug}`}
            className="underline text-sm text-rose-500"
          >
            {format(new Date(libraryArticle.createdAt), 'do LLL, yyyy')}
          </Link>
        </div>
      ))}
    </>
  )
}

export default ArticlesIndexPage
