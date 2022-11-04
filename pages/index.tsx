import Image from "next/image";
import memoji from "../public/memoji.png";
import { getSortedPostsData, PostData } from "../lib/posts";
import Link from "next/link";
import MailButton from "../components/mail-button";
import Divider from "../components/divider";
import {
  NewspaperIcon,
  BriefcaseIcon,
  BookmarkIcon,
  ClockIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import RecentArticle from "../components/recent-article";
import HomepageHeadline from "../components/homepage-headline";
import Project from "../components/project";
import Layout from "../components/layout";

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }: props) {
  return (
    <Layout>
      <div className="flex justify-center items-center">
        <div className="mr-12">
          <h2 className="text-4xl text-violet-500 dark:text-violet-400 mb-2 font-headline font-bold">
            Hi, I&apos;m Chris Jarling
          </h2>
          <p className="text-xl leading-10 mb-6">
            I am a FullStack Developer and Designer who knows his way around
            ReactJS, Ruby on Rails, JavaScript, HTML, CSS and UI Design.
          </p>
          <MailButton />
        </div>
        <div className="inline-block shrink-0">
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
      <Divider />
      <HomepageHeadline>
        <BriefcaseIcon className="w-6 h-6 mr-2" />
        Current Projects
      </HomepageHeadline>
      <div className="grid grid-cols-3 gap-6 mt-8">
        <Project
          title="reportty"
          content="Stuff I am wrking on right now"
          link="/projects/reportty"
          icon={<ClockIcon />}
        />
        <Project
          title="cilatl"
          content="Stuff I am wrking on right now"
          link="/projects/cliatl"
          icon={<BookmarkIcon />}
        />
        <Project
          title="ohes"
          content="Stuff I am wrking on right now"
          link="/projects/ohes"
          icon={<ComputerDesktopIcon />}
        />
      </div>
      <div className="mt-96">Here be home</div>
      <h2>All posts</h2>
      <ul>
        {allPostsData.map((postData) => (
          <li key={postData.id}>
            <Link href={`/posts/${postData.id}`}>{postData.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

type props = {
  allPostsData: PostData[];
};
