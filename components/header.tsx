import Link from 'next/link'
import MainNavLink from './main-nav-link'

export default function Header() {
  return (
    <div className="py-4 mx-auto text-base-200 flex justify-between items-center">
      <div className="flex flex-col">
        <Link href="/" className="font-bold transition-all hover:text-base-50">
          <h1>Chris Jarling</h1>
        </Link>
        <a
          href="https://twitter.com/chrisjarling"
          className="text-base-600 hover:text-base-400"
        >
          @chrisjarling
        </a>
      </div>
      <nav>
        <div className="flex justify-center items-center">
          <MainNavLink lastOfType href="/about">
            About
          </MainNavLink>
        </div>
      </nav>
    </div>
  )
}
