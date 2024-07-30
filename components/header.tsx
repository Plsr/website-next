import Link from 'next/link'

export default function Header() {
  return (
    <div className="py-4 px-4 mx-auto max-w-6xl text-base-800 dark:text-base-50 flex justify-between items-center">
      <div className="flex flex-col justify-center">
        <Link href="/" className="hover:text-accent-500">
          <h1 className="-mb-1 font-bold">Chris Jarling</h1>
        </Link>
        <span className="text-base-500 font-light">Fullstack Engineer</span>
      </div>
      <nav>
        <div className="flex justify-center items-center">
          <Link href="/about">About</Link>
        </div>
      </nav>
    </div>
  )
}
