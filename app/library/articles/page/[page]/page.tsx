import { ArticleFeedItem } from 'components/article-feed-item'
import { Pagination } from 'components/pagination'
import { getPaginatedArticles } from 'data/articles.dto'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

type Params = {
  params: Promise<{
    page: string
  }>
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params
  const page = parseInt(params.page, 10)

  return {
    title: `Library: Articles - Page ${page} - Chris Jarling`,
    description: 'A list of links I read and found interesting.',
  }
}

export const generateStaticParams = () => []

const ArticlesPaginatedPage = async (props: Params) => {
  const params = await props.params
  const page = parseInt(params.page, 10)

  if (isNaN(page) || page < 1) {
    return notFound()
  }

  if (page === 1) {
    redirect('/library/articles')
  }

  const { articles, pagination } = await getPaginatedArticles(page, 10)

  if (articles.length === 0) {
    return notFound()
  }

  return (
    <>
      <div className="prose prose-invert mb-12">
        <h1>Article reading notes</h1>
        <p>Notes on articles I read and found interesting.</p>
      </div>

      {articles.map((article) => (
        <ArticleFeedItem key={article.slug} article={article} />
      ))}

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        recordName="library/articles"
      />
    </>
  )
}

export default ArticlesPaginatedPage
