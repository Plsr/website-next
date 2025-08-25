import Link from 'next/link'

export const Navigation = () => {
  return (
    <nav className="flex flex-col">
      <Link href="/posts/page/1">Blog</Link>
      <Link href="/about">About</Link>
      <Link href="/now">Now</Link>
    </nav>
  )
}
