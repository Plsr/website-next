import { allLibraryArticles } from '.contentlayer/generated'
import { StyledArticleContent } from 'components/styled-article-content'
import { format } from 'date-fns'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Params = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const libraryArticle = allLibraryArticles.find((libraryArticle) => {
    return libraryArticle.computedSlug === params.slug
  })

  if (!libraryArticle) {
    throw new Error(`Post not found for slug: ${params.slug}`)
  }

  const title = `Link: ${libraryArticle.title} - Chris Jarling`
  const description = libraryArticle.body.raw.slice(0, 150)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: 'https://www.chrisjarling.com/og.jpg',
          secureUrl: 'https://www.chrisjarling.com/og.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

const LibraryArticleDetailPage = ({ params }: Params) => {
  const libraryArticle = allLibraryArticles.find(
    (article) => article.computedSlug === params.slug
  )

  if (!libraryArticle) {
    return notFound()
  }

  return (
    <div className="prose dark:prose-invert" key={libraryArticle._id}>
      <h2>{libraryArticle.title}</h2>
      <span className="text-sm block mb-8">
        Link: <a href={libraryArticle.link}>{libraryArticle.link}</a>
      </span>

      <StyledArticleContent contentHtml={libraryArticle.body.html} />

      <span className="text-sm text-slate-400 mb-1 block">
        {format(new Date(libraryArticle.createdAt), 'do LLL, yyyy')}
      </span>
    </div>
  )
}

export default LibraryArticleDetailPage
