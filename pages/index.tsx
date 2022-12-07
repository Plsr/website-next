import Image from 'next/image'
import memoji from '../public/memoji.png'
import { getSortedPostsData, PostData } from '../lib/posts'
import Link from 'next/link'
import MailButton from '../components/mail-button'
import Divider from '../components/divider'
import { NewspaperIcon } from '@heroicons/react/24/outline'
import RecentArticle from '../components/recent-article'
import HomepageHeadline from '../components/homepage-headline'

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }: props) {
  return (
    <>
      <div className="flex md:flex-row flex-col-reverse justify-center items-center">
        <div className="mr-12">
          <h2 className="text-4xl text-yellow-200 mb-2 font-headline font-bold">
            Hi, I&apos;m Chris Jarling
          </h2>
          <p className="text-xl leading-10 mb-6">
            I am a FullStack Developer who loves writing React, based in
            Cologne, Germany. <br />I currently work on shaping the future of
            phone plans at gigs 😍
          </p>
          <MailButton />
        </div>
        <div className="mb-8 md:mb-0 inline-block shrink-0">
          <Image src={memoji} alt="Me, as a memoji" height="220" />
        </div>
      </div>
      <Divider />
      <HomepageHeadline>
        <NewspaperIcon className="w-6 h-6 mr-2" />
        Latest posts
      </HomepageHeadline>
      <ul>
        {allPostsData.slice(2).map((postData) => (
          <li key={postData.id} className="mb-12">
            <RecentArticle
              id={postData.id}
              title={postData.title}
              date={postData.date}
              excerpt={postData.excerpt}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

type props = {
  allPostsData: PostData[]
}
