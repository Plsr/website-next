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
      <div className="grid gird-cols-1 md:grid-cols-3 gap-4">
        {sortedSeeds.map((seed: Seed) => (
          <Link key={seed._id} href={`/digital-garden/${seed.slug}`}>
            <div className="p-4 bg-storm-gray-800 flex flex-col rounded-lg h-full hover:bg-storm-gray-700">
              <span className="font-bold">{seed.title}</span>
              {seed.excerpt && (
                <span className="text-xs mt-2">{seed.excerpt}</span>
              )}
              <span className="text-xs text-rose-bud-100 mt-2">
                Updated at: {format(new Date(seed.updatedAt), 'do LLL, yyyy')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default DigitalGardenIndexPage
