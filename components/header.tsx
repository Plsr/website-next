import Link from "next/link";
import Image from "next/image";
import logo from "../public/cj-logo.svg";
import { BeakerIcon, UserCircleIcon, NewspaperIcon, BookOpenIcon } from '@heroicons/react/24/outline'

import MainNavLink from "./main-nav-link";

export default function Header() {
  return (
    <div className="fixed top-0 left-2/4 -translate-x-2/4 mt-4 mx-auto bg-slate-800/[.8] drop-shadow-md w-full max-w-3xl backdrop-blur p-4 border rounded border-slate-700">
        <nav className="flex justify-around items-center">
          <h1 className="inline">
            <Link href="/">
              <Image src={logo} height="30" alt="Logo of the website, a c and an j" />
            </Link>
          </h1>
            <MainNavLink href=""><div className="flex items-center"><NewspaperIcon className="h-4 w-4 mr-2"/>Posts</div></MainNavLink>
            <MainNavLink href=""><div className="flex items-center"><BookOpenIcon className="h-4 w-4 mr-2"/>Notes</div></MainNavLink>
            <MainNavLink href=""><div className="flex items-center"><UserCircleIcon className="h-4 w-4 mr-2"/>About</div></MainNavLink>
            <MainNavLink href=""><div className="flex items-center"><BeakerIcon className="h-4 w-4 mr-2"/>Now</div></MainNavLink>
        </nav>
      </div>
  );
}
