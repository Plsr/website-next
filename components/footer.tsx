import Link from 'next/link'

const copyrightString = `© ${new Date().getFullYear()} Chris Jarling`

export default function Footer() {
  return (
    <div className="mt-auto pt-12">
      <hr className="dark:bg-gray-700 h-px border-0 bg-gray-100" />
      <div className="dark:text-gray-400 mt-12 flex justify-center gap-12 text-gray-700">
        <Link href="/imprint" className="">
          Now
        </Link>

        <Link href="/privacy" className="">
          Uses
        </Link>

        <Link href="/privacy" className="">
          Tags
        </Link>

        <Link href="/privacy" className="">
          Reading
        </Link>
      </div>
      <div className="mt-8 flex justify-center gap-6 text-gray-500">
        <small>{copyrightString}</small>
        <small>
          <Link href="/imprint" className="underline decoration-dotted">
            Imprint
          </Link>
        </small>
        <small>
          <Link href="/privacy" className="underline decoration-dotted">
            Privacy Policy
          </Link>
        </small>
      </div>
    </div>
  )
}
