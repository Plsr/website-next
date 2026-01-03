import { ArticleFeedItem } from 'components/article-feed-item'
import { Pagination } from 'components/pagination'
import { getPaginatedArticles } from 'data/articles.dto'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Library: Articles - Chris Jarling',
  description: 'A list of links I read and found interesting.',
}

const ArticlesIndexPage = async () => {
  const { articles, pagination } = await getPaginatedArticles(1, 10)

  return (
    <>
      <div className="prose prose-invert mb-12">
        <h1>Article reading notes</h1>
        <p>Notes on articles I read and found interesting.</p>
      </div>

      {articles.length === 0 ? (
        <p className="text-base-500">No article notes yet.</p>
      ) : (
        <>
          {articles.map((article) => (
            <ArticleFeedItem key={article.slug} article={article} />
          ))}

          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              recordName="library/articles"
            />
          )}
        </>
      )}
    </>
  )
}

export default ArticlesIndexPage
