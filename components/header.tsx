import MainNavLink from './main-nav-link'

export default function Header() {
  return (
    <div className="mt-8 mx-auto w-full max-w-screen-md bg-white  text-slate-900">
      <nav>
        <div className="flex justify-center items-center">
          <MainNavLink href="/">Home</MainNavLink>
          <MainNavLink href="/posts/1">Posts</MainNavLink>
          <MainNavLink href="/notes/1">Notes</MainNavLink>
        </div>
      </nav>
    </div>
  )
}
