import { StyledArticleContent } from 'components/styled-article-content'
import { getAllEntryIds, getEntryData } from 'lib/entries'
import { BlogPostHeadline } from 'components/blog-post-headline'
import { PostMetadata } from 'components/post-metadata'
import { PostSeriesBlock } from 'components/PostSeriesBlock'
import { postSeriesList, SeriesEntry } from 'lib/post-series'
import { Tag } from 'components/tag'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

type Params = {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const postIds = getAllEntryIds('posts')
  return postIds.map((id) => ({ params: { id } }))
}

export async function generateMetadata({ params }: Params) {
  const postData = await getEntryData(params!.id as string, 'posts')
  return {
    title: `${postData.title} - Chris Jarling`,
    description: postData.excerpt?.substring(0, 155) || postData.description,
  }
}

export default async function Post({ params }: Params) {
  console.log(params)
  const postData = await getEntryData(params!.id as string, 'posts')

  if (!postData) {
    notFound()
  }

  const seriesEntries = postData.series
    ? await postSeriesList(postData.series)
    : undefined

  return (
    <>
      <div>
        <div className="mb-8">
          <div className="mb-2">
            <PostMetadata>{postData.formattedDate}</PostMetadata>
          </div>
          <BlogPostHeadline title={postData.title} />
          {seriesEntries && (
            <PostSeriesBlock
              seriesEntries={seriesEntries}
              activeEntryId={params.id}
            />
          )}
        </div>
        <StyledArticleContent contentHtml={postData.contentHtml} />
      </div>
      {postData.tags.map((tag) => (
        <Tag name={tag} key={tag} />
      ))}
    </>
  )
}
