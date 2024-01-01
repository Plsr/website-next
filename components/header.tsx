import MainNavLink from './main-nav-link'

export default function Header() {
  return (
    <div className="py-4 mx-auto w-full text-slate-200 fixed z-50 bg-base-950/95">
      <nav>
        <div className="flex justify-center items-center">
          <MainNavLink href="/">Home</MainNavLink>
          <MainNavLink href="/posts/page/1">Posts</MainNavLink>
          <MainNavLink href="/notes/page/1">Notes</MainNavLink>
          <MainNavLink href="/digital-garden">Garden</MainNavLink>
        </div>
      </nav>
    </div>
  )
}
