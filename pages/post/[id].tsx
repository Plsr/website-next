import { GetStaticPropsContext } from 'next'
import { StyledArticleContent } from '../../components/styled-article-content'
import Head from 'next/head'
import { BlogPost, getAllEntryIds, getEntryData } from '../../lib/entries'

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
      </Head>
      <div className="text-slate-300">
        <div className="mb-12">
          <small className="text-slate-500 text-sm">
            {postData.formattedDate}
          </small>
          <h1 className="font-headline text-3xl mt-2">{postData.title}</h1>
        </div>
        <StyledArticleContent contentHtml={postData.contentHtml} />
      </div>
    </>
  )
}

type props = {
  postData: BlogPost
}
