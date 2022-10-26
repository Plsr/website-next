import { useState, useEffect } from "react";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }: any) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>();
  console.log(allPostsData);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const handleDarkModeToggleClick = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <div>Here be home</div>
      <button onClick={handleDarkModeToggleClick}>Toggle dark mode</button>
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
