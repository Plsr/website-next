import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

type MatterPostData = {
  title: string;
  date: string;
};

export type PostData = {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  contentHtml: string;
};

const postsDirectory = path.join(process.cwd(), "posts");

export async function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);
      let excerpt: string | undefined = matterResult.data.excerpt;
      console.log(excerpt);

      if (!excerpt) {
        const processedContent = await remark()
          .use(html)
          .process(matterResult.content);
        excerpt = processedContent.toString().substring(0, 300) + "...";
      }

      return {
        id,
        excerpt,
        ...(matterResult.data as MatterPostData),
      };
    })
  );

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as MatterPostData),
  };
}
