import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/cj-logo.svg'
import {
  BeakerIcon,
  UserCircleIcon,
  NewspaperIcon,
  BookOpenIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  PencilIcon,
} from '@heroicons/react/24/solid'
import { useMediaQuery } from 'react-responsive'
import { motion, AnimatePresence } from 'framer-motion'

import MainNavLink from './main-nav-link'
import { useEffect, useState } from 'react'

export default function Header() {
  // TODO: Move into a provider if needed elswhere
  const [isSmallScreen, setIsSmallScreen] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const isSmallScreenQuery = useMediaQuery({ maxWidth: 600 })

  useEffect(() => {
    setIsSmallScreen(isSmallScreenQuery)
  }, [isSmallScreenQuery])

  const handleMenuButtonClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="mt-8 mx-auto w-full max-w-screen-md bg-white  text-slate-900">
      <nav>
        <div className="flex md:justify-around justify-between items-center">
          <MainNavLink href="/">Home</MainNavLink>
          <MainNavLink href="/posts/1">Posts</MainNavLink>
          <MainNavLink href="/notes/1">Notes</MainNavLink>
          <MainNavLink href="/about">About</MainNavLink>
          <MainNavLink href="/now">Now</MainNavLink>
        </div>
      </nav>
    </div>
  )
}

type MenuButtonProps = {
  isExpanded: boolean
  onClick: () => void
}

const MenuButton = ({ isExpanded, onClick }: MenuButtonProps) => {
  const handleClick = () => {
    onClick()
  }

  const buttonContent = () => {
    if (isExpanded) {
      return (
        <>
          <span className="mr-2">Close</span>
          <XMarkIcon className="h-6 w-6 mr-2" />
        </>
      )
    }

    return (
      <>
        <span className="mr-2">Menu</span>
        <Bars3Icon className="h-6 w-6 mr-2" />
      </>
    )
  }

  return (
    <button onClick={handleClick} className="flex flex-row items-center">
      {buttonContent()}
    </button>
  )
}
