import Link from 'next/link'

export const Navigation = () => {
  return (
    <nav className="flex md:flex-col flex-row md:gap-1 gap-4">
      <Link href="/posts/page/1">Blog</Link>
      <Link href="/about">About</Link>
      <Link href="/now">Now</Link>
    </nav>
  )
}
