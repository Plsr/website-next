import { useState, useEffect } from "react";
import { getSortedPostsData, PostData } from "../lib/posts";
import Link from "next/link";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }: props) {
  return (
    <>
      <div>Here be home</div>
      <h2>All posts</h2>
      <ul>
        {allPostsData.map((postData) => (
          <li key={postData.id}>
            <Link href={`/posts/${postData.id}`}>{postData.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

type props = {
  allPostsData: PostData[];
};
