import Link from 'next/link'

const copyrightString = `© ${new Date().getFullYear()} Chris Jarling`

export default function Footer() {
  return (
    <div className="mt-auto">
      <div className="px-8 py-12">
        <div className="max-w-[760px] mx-auto text-gray-100">
          <div className="flex justify-center">
            <Link
              href="/tags"
              className="underline-offset-4 hover:underline text-base-500"
            >
              Tags
            </Link>
          </div>
          <div className="mt-12 flex justify-center items-center text-base-500">
            <small>
              {copyrightString} - <ReleaseVersion />
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}

const ReleaseVersion = () => {
  if (!process.env.RELEASE_VERSION) return <span>dev build</span>

  const displayValue = process.env.RELEASE_VERSION.slice(
    process.env.RELEASE_VERSION.length - 7,
    process.env.RELEASE_VERSION.length,
  )
  return (
    <a
      href={`https://github.com/Plsr/website-next/commit/${process.env.RELEASE_VERSION}`}
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
    >
      {displayValue}
    </a>
  )
}
