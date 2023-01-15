import { GetStaticPropsContext } from 'next'
import { StyledArticleContent } from '../../components/styled-article-content'
import Head from 'next/head'
import {
  BlogPost,
  getAllEntryIds,
  getEntryData,
  getSortedAndFilteredEntries,
} from '../../lib/entries'
import { BlogPostHeadline } from '../../components/blog-post-headline'
import { PostMetadata } from '../../components/post-metadata'
import { siteUrl } from '../../lib/utill/site'
import Link from 'next/link'

export async function getStaticPaths() {
  const postIds = getAllEntryIds('posts')
  return {
    paths: postIds.map((id) => ({ params: { id } })),
    fallback: false,
  }
}

type SeriesEntry = {
  title: string
  url: string
  current: boolean
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const postData = await getEntryData(params!.id as string, 'posts')

  const seriesEntriesDataset = async (): Promise<SeriesEntry[] | null> => {
    if (postData.series) {
      const seriesEntries = await getSortedAndFilteredEntries({
        filterBySeries: postData.series!,
        entryType: 'posts',
      })

      return seriesEntries
        .map((entry) => {
          const current = entry.id === postData.id
          const url = `${siteUrl}/post/${entry.id}`

          return {
            title: entry.title,
            url,
            current,
          }
        })
        .reverse()
    }

    return null
  }

  return {
    props: {
      postData,
      seriesEntries: await seriesEntriesDataset(),
    },
  }
}

export default function Post({ postData, seriesEntries }: props) {
  console.log(seriesEntries)
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
          {seriesEntries && seriesEntries.length > 1 && (
            <div className="bg-blue-50 rounded p-6 inline-block mt-8">
              <h3 className="italic text-slate-500 mb-4">
                This post is part of a series. Here are the other parts:
              </h3>
              <ul className="list-disc ml-8">
                {seriesEntries.map((entry) => (
                  <li key={entry.title} className="mb-2 last:mb-0">
                    {entry.current ? (
                      <p className="text-slate-600 font-bold">
                        {entry.title}{' '}
                        <span className="font-normal">(currently reading)</span>
                      </p>
                    ) : (
                      <Link
                        className="text-blue-500 hover:underline"
                        href={entry.url}
                      >
                        {entry.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <StyledArticleContent contentHtml={postData.contentHtml} />
      </div>
    </>
  )
}

type props = {
  postData: BlogPost
  seriesEntries?: SeriesEntry[]
}
