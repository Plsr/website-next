import MainNavLink from './main-nav-link'

export default function Header() {
  return (
    <div className="py-4 mx-auto w-full bg-zinc-800/70 text-slate-200 fixed z-50 backdrop-blur">
      <nav>
        <div className="flex justify-center items-center">
          <MainNavLink href="/">Home</MainNavLink>
          <MainNavLink href="/posts">Posts</MainNavLink>
          <MainNavLink href="/notes/1">Notes</MainNavLink>
          <MainNavLink href="/bookmarks">Bookmarks</MainNavLink>
        </div>
      </nav>
    </div>
  )
}
