import Image from 'next/image'
import Link from 'next/link'

export const GigsCallout = () => {
  return (
    <div className="dark:bg-base-300 dark:border-none mt-20 flex flex-col gap-6 rounded-lg border border-base-200 bg-base-50 p-4 md:flex-row md:gap-2">
      <Image
        className="self-center"
        src="/gigs_logo.png"
        width={130}
        height={34}
        alt=""
      />
      <p className="dark:text-base-700 flex-wrap text-sm text-base-500">
        I currently work as an <strong>Engineering Manager</strong> at{' '}
        <strong>Gigs</strong>, where we shape the future of telecom. We&apos;re
        hiring, come work with me.{' '}
        <Link
          href="/"
          className="dark:text-base-900 block text-base-700 underline md:inline"
        >
          Read why you should &rarr;
        </Link>
      </p>
      <button className="shrink-0 self-center rounded-lg border border-indigo-600 bg-indigo-500 px-4 py-1 text-sm text-indigo-50 transition-colors hover:bg-indigo-600">
        Work with me
      </button>
    </div>
  )
}
