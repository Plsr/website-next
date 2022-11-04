import { cloneElement, ReactElement } from "react";
import Link from "next/link";
import ReadMoreLink from "./read-more-link";
import useHover from "../lib/hooks/useHover";

export default function Project({ title, content, link, icon }: props) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  return (
    <Link href={link}>
      <div
        ref={hoverRef}
        className="shadow cursor-pointer rounded-lg bg-slate-800 hover:scale-105 transition hover:shadow-lg"
      >
        <div className="py-8 bg-gradient-to-br from-red-300 via-violet-300 to-fuchsia-400 rounded-t-lg">
          {cloneElement(icon, {
            className: "opacity-80 w-12 h-12 my-12 mx-auto ",
          })}
        </div>
        <div className="p-4">
          <h2 className="text-lg text-bold font-headline mb-3">{title}</h2>
          <p className="text-sm mb-8">{content}</p>

          <ReadMoreLink
            text="Learn more"
            withArrow={false}
            isHovered={isHovered}
          />
        </div>
      </div>
    </Link>
  );
}

type props = {
  title: string;
  content: string;
  link: string;
  icon: ReactElement;
};
