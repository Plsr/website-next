import { GetStaticPropsContext } from 'next'
import { StyledArticleContent } from '../../components/styled-article-content'
import Head from 'next/head'
import { BlogPost, getAllEntryIds, getEntryData } from '../../lib/entries'
import { BlogPostHeadline } from '../../components/blog-post-headline'
import { PostMetadata } from '../../components/post-metadata'

export async function getStaticPaths() {
  const postIds = getAllEntryIds('posts')
  return {
    paths: postIds.map((id) => ({ params: { id } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const postData = await getEntryData(params!.id as string, 'posts')

  return {
    props: {
      postData,
    },
  }
}

export default function Post({ postData }: props) {
  return (
    <>
      <Head>
        <title>{postData.title} - Chris Jarling</title>
        <meta
          name="description"
          content={postData.excerpt?.substring(0, 155) || postData.description}
        />
      </Head>
      <div className="text-slate-300">
        <div className="mb-8">
          <div className="mb-2">
            <PostMetadata>{postData.formattedDate}</PostMetadata>
          </div>
          <BlogPostHeadline title={postData.title} />
        </div>
        <StyledArticleContent contentHtml={postData.contentHtml} />
      </div>
    </>
  )
}

type props = {
  postData: BlogPost
}
