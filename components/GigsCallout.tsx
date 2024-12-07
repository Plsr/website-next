import Image from 'next/image'
import Link from 'next/link'

export const GigsCallout = () => {
  return (
    <div className="flex md:flex-row flex-col border md:gap-2 gap-6 border-gray-200 bg-gray-50 rounded-lg mt-20 p-4">
      <Image
        className="self-center"
        src="/gigs_logo.png"
        width={130}
        height={34}
        alt=""
      />
      <p className="flex-wrap text-gray-500 text-sm">
        I currently work as an <strong>Engineering Manager</strong> at{' '}
        <strong>Gigs</strong>, where we shape the future of telecom. We&apos;re
        hiring, come work with me.{' '}
        <Link href="/" className="text-gray-700 underline md:inline block">
          Read why you should &rarr;
        </Link>
      </p>
      <button className="self-center text-sm shrink-0 hover:bg-indigo-600 transition-colors bg-indigo-500 border border-indigo-600 rounded-lg px-4 py-1 text-indigo-50">
        Work with me
      </button>
    </div>
  )
}
