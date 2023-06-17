import { GetStaticPropsContext } from 'next'
import { StyledArticleContent } from 'components/styled-article-content'
import Head from 'next/head'
import { BlogPost, getAllEntryIds, getEntryData } from 'lib/entries'
import { BlogPostHeadline } from 'components/blog-post-headline'
import { PostMetadata } from 'components/post-metadata'
import { PostSeriesBlock } from 'components/PostSeriesBlock'
import { postSeriesList, SeriesEntry } from 'lib/post-series'
import { Tag } from 'components/tag'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const postIds = getAllEntryIds('posts')
  return postIds.map((id) => ({ params: { id } }))
}

export default async function Post({ params }: { params: { id: string } }) {
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
      <Head>
        <title>{postData.title} - Chris Jarling</title>
        <meta
          name="description"
          content={postData.excerpt?.substring(0, 155) || postData.description}
        />
      </Head>
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
