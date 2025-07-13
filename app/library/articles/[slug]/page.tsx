import { StyledArticleContent } from 'components/styled-article-content'
import { allLibraryArticles } from 'content-collections'
import { format } from 'date-fns'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Params = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params
  const libraryArticle = allLibraryArticles.find((libraryArticle) => {
    return libraryArticle.computedSlug === params.slug
  })

  if (!libraryArticle) {
    throw new Error(`Post not found for slug: ${params.slug}`)
  }

  const title = `Link: ${libraryArticle.title} - Chris Jarling`
  const description = libraryArticle.content.slice(0, 150)

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

// Ensure this page is statically generated
export const generateStaticParams = () => []

const LibraryArticleDetailPage = async (props: Params) => {
  const params = await props.params
  const libraryArticle = allLibraryArticles.find(
    (article) => article.computedSlug === params.slug,
  )

  if (!libraryArticle) {
    return notFound()
  }

  return (
    <div className="prose prose-invert">
      <Link
        href="/library/articles"
        className="text-sm text-base-700 mb-1 block"
      >
        <span className="text-base-700">← All reading notes</span>
      </Link>
      <h2>{libraryArticle.title}</h2>
      <span className="text-sm block mb-8">
        Link: <a href={libraryArticle.link}>{libraryArticle.link}</a>
      </span>

      <StyledArticleContent contentHtml={libraryArticle.html} />

      <span className="text-sm text-base-700 mb-1 block">
        {format(new Date(libraryArticle.createdAt), 'do LLL, yyyy')}
      </span>
    </div>
  )
}

export default LibraryArticleDetailPage
