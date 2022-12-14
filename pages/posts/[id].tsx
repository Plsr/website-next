import { getAllPostIds, getPostData, PostData } from '../../lib/posts'
import { GetStaticPropsContext } from 'next'
import styles from './[id].module.css'
import format from 'date-fns/format'

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
  const formattedDate = format(new Date(postData.date), 'do MMMM, yyyy')
  return (
    <div className="text-slate-300">
      <div className="mb-12">
        <h1 className="font-headline text-3xl md:text-4xl">{postData.title}</h1>
        <small className="text-slate-500">{formattedDate}</small>
      </div>
      <div
        className={styles.article}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </div>
  )
}

type props = {
  postData: PostData
}
