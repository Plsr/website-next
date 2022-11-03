import { getAllPostIds, getPostData, PostData } from '../../lib/posts'
import { GetStaticPropsContext } from 'next'

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
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </>
  )
}

type props = {
  postData: PostData
}
