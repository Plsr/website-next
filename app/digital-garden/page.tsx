import Link from 'next/link'
import { allSeeds, Seed } from '.contentlayer/generated'
import { format } from 'date-fns'

const DigitalGardenIndexPage = async () => {
  const sortedSeeds = allSeeds.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  return (
    <>
      <div className="text-xl font-bold mb-4">The garden</div>
      {sortedSeeds.map((seed: Seed) => (
        <Link
          key={seed._id}
          href={`/digital-garden/${seed.slug}`}
          className="block mb-2 border-b dark:border-b-base-600 pb-2"
        >
          <div className="flex flex-row justify-between items-center rounded-lg h-full">
            <span className="font-bold">{seed.title}</span>
            <span className="text-xs text-indigo-bud-100 mt-2">
              Updated at: {format(new Date(seed.updatedAt), 'do LLL, yyyy')}
            </span>
          </div>
        </Link>
      ))}
    </>
  )
}

export default DigitalGardenIndexPage
