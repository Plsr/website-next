import Image from 'next/image'
import Link from 'next/link'

import { Navigation } from './navigation'

export const Sidebar = () => {
  return (
    <div className="px-4 pt-12">
      <Link
        href="/"
        className="hover:text-accent-600 text-base-300 transition-all block mb-6"
      >
        <h1 className="hidden">Chris Jarling</h1>
        <Image
          src="/me_notion.jpg"
          alt="Chris Jarling Portrait"
          width={200}
          height={200}
          className="rounded-full w-16 h-16"
        />
      </Link>
      <Navigation />
    </div>
  )
}
