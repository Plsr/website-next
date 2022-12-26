import { getAllPostIds, getPostData, PostData } from '../../lib/posts'
import { GetStaticPropsContext } from 'next'
import { StyledArticleContent } from '../../components/styled-article-content'
import Head from 'next/head'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const postData = await getPostData(params!.id as string)

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
        <title>{postData.title} - Chris Jarlin</title>
      </Head>
      <div className="text-slate-300">
        <div className="mb-12">
          <h1 className="font-headline text-3xl md:text-4xl">
            {postData.title}
          </h1>
          <small className="text-slate-500">{postData.formattedDate}</small>
        </div>
        <StyledArticleContent contentHtml={postData.contentHtml} />
      </div>
    </>
  )
}

type props = {
  postData: PostData
}
