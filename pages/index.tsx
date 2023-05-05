import Image from 'next/image'
import memoji from '../public/memoji.png'
import { getSortedAndFilteredEntries, BlogPost } from '../lib/entries'
import RecentArticle from '../components/recent-article'
import HomepageHeadline from '../components/homepage-headline'
import { generateFeeds } from '../lib/feeds'
import { SocialLink } from '../components/social-link'

export async function getStaticProps() {
  await generateFeeds()
  const allPostsData = await getSortedAndFilteredEntries({ entryType: 'posts' })
  const recentPosts = allPostsData.slice(0, 3)

  return {
    props: {
      recentBlogPosts: recentPosts,
    },
  }
}

export default function Home({ recentBlogPosts }: props) {
  return (
    <>
      <div className="flex md:flex-row flex-col-reverse justify-center items-center mb-36">
        <div className="mr-0 md:mr-12">
          <h2 className="text-xl text-gray-100 mb-4 font-headline font-bold">
            Hi, I&apos;m Chris Jarling 👋
          </h2>
          <p className=" text-gray-400 mb-6">
            I am a FullStack Developer who loves writing React, based in
            Cologne, Germany. <br />I currently work on shaping the future of
            phone plans at gigs 😍
          </p>
          <div className="flex gap-4 mt-12 flex-wrap">
            <SocialLink href="mailto:hi@chrisjarling.com">Email</SocialLink>
            <SocialLink href="https://hachyderm.io/@chrisjarling" rel="me">
              Mastodon
            </SocialLink>
            <SocialLink href="https://github.com/Plsr" rel="me">
              Github
            </SocialLink>
          </div>
        </div>
        <div className="mb-8 md:mb-0 inline-block shrink-0">
          <Image src={memoji} alt="Me, as a memoji" height="180" />
        </div>
      </div>

      <HomepageHeadline>Latest posts</HomepageHeadline>
      <ul>
        {recentBlogPosts.map((postData) => (
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
  recentBlogPosts: BlogPost[]
}
