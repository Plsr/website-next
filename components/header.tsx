import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/cj-logo.svg'
import {
  BeakerIcon,
  UserCircleIcon,
  NewspaperIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'
import { useMediaQuery } from 'react-responsive'

import MainNavLink from './main-nav-link'
import { useEffect, useState } from 'react'

export default function Header() {
  // TODO: Move into a provider
  const [isSmallScreen, setIsSmallScreen] = useState(true)
  const isSmallScreenQuery = useMediaQuery({ maxWidth: 600 })

  useEffect(() => {
    setIsSmallScreen(isSmallScreenQuery)
  }, [isSmallScreenQuery])

  return (
    <div className="fixed z-10 top-0 left-2/4 -translate-x-2/4 mt-4 mx-auto bg-slate-800/[.8] shadow-md w-full max-w-screen-md backdrop-blur p-4 border rounded border-slate-700 text-white">
      <nav className="flex justify-around items-center">
        <h1 className="inline hover:scale-125 transition">
          <Link href="/">
            <Image
              src={logo}
              height="30"
              alt="Logo of the website, a c and an j"
            />
          </Link>
        </h1>
        {!isSmallScreen && (
          <>
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
          </>
        )}
      </nav>
    </div>
  )
}
