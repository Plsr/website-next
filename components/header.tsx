import MainNavLink from './main-nav-link'

export default function Header() {
  return (
    <div className="py-4 mx-auto text-base-200 flex justify-between items-center">
      <MainNavLink href="/">
        <h1>Chris Jarling</h1>
      </MainNavLink>
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
