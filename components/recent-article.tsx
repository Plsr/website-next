import Link from "next/link";
import formatDistance from "date-fns/formatDistance";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import useHover from "../lib/hooks/useHover";
import { useRouter } from "next/router";

export default function RecentArticle({ date, id, title, excerpt }: props) {
  const postDate = Date.parse(date);
  const ago = formatDistance(postDate, new Date());
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const router = useRouter();

  const onPostClick = () => {
    router.push(`/posts/${id}`);
  };

  return (
    <div
      ref={hoverRef}
      onClick={onPostClick}
      className="pt-5 pb-6 px-4 cursor-pointer rounded-lg transition-all duration-500 hover:shadow-lg hover:bg-blue-50 dark:hover:bg-slate-800"
    >
      <small className="text-slate-500">{ago} ago</small>
      <h4 className="transition text-2xl mb-3 font-headline dark:text-slate-200 text-slate-700">
        {title}
      </h4>
      {excerpt && (
        <>
          <div
            className="text-slate-500 dark:text-slate-400"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </>
      )}
      <div className="mt-3 inline-block text-slate-700 dark:text-slate-300">
        <div className="flex items-center">
          <span>Read more</span>
          <ArrowRightIcon
            className={`transition duration-300 w-4 h-4 ml-2 ${
              isHovered ? "opacity-1" : "opacity-0"
            }`}
          />
        </div>
        <div
          className={`transition duration-300 w-full h-0.5 rounded ${
            isHovered ? "opacity-1" : "opacity-0"
          } bg-gradient-to-r from-fuchsia-500 to-violet-500`}
        />
      </div>
    </div>
  );
}

type props = {
  date: string;
  id: string;
  title: string;
  excerpt?: string;
};
