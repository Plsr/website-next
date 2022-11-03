import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/cj-logo.svg'
import {
  BeakerIcon,
  UserCircleIcon,
  NewspaperIcon,
  BookOpenIcon,
  MoonIcon,
} from '@heroicons/react/24/outline'

import MainNavLink from './main-nav-link'
import DarkModeToggle from './dark-mode-toggle'

export default function Header() {
  return (
    <div className="fixed z-10 top-0 left-2/4 -translate-x-2/4 mt-4 mx-auto bg-slate-200/[.8] dark:bg-slate-800/[.8] shadow-md w-full max-w-screen-md backdrop-blur p-4 border rounded border-slate-300 dark:border-slate-700">
      <nav className="flex justify-around items-center">
        <h1 className="inline">
          <Link href="/">
            <Image
              src={logo}
              height="30"
              alt="Logo of the website, a c and an j"
            />
          </Link>
        </h1>
        <MainNavLink href="/posts">
          <div className="flex items-center">
            <NewspaperIcon className="h-4 w-4 mr-2" />
            Posts
          </div>
        </MainNavLink>
        <MainNavLink href="/notes">
          <div className="flex items-center">
            <BookOpenIcon className="h-4 w-4 mr-2" />
            Notes
          </div>
        </MainNavLink>
        <MainNavLink href="/about">
          <div className="flex items-center">
            <UserCircleIcon className="h-4 w-4 mr-2" />
            About
          </div>
        </MainNavLink>
        <MainNavLink href="/now">
          <div className="flex items-center">
            <BeakerIcon className="h-4 w-4 mr-2" />
            Now
          </div>
        </MainNavLink>
        <DarkModeToggle />
      </nav>
    </div>
  )
}
