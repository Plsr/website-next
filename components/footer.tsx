import Link from 'next/link'

const copyrightString = `© ${new Date().getFullYear()} Chris Jarling`

export default function Footer() {
  return (
    <div className="mt-auto pt-12">
      <hr className="border-0 bg-gray-100 h-px" />
      <div className="mt-12 flex justify-center text-gray-700 gap-12">
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
      <div className="mt-8 flex justify-center text-gray-500 gap-6">
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
