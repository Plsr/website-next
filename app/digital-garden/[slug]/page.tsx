import { StyledArticleContent } from 'components/styled-article-content'
import { notFound } from 'next/navigation'
import { allSeeds, Seed } from '.contentlayer/generated'
import { Metadata } from 'next'
import Link from 'next/link'

type Params = {
  params: {
    slug: string
  }
}

export const generateStaticParams = () => []

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const seed = allSeeds.find((seed: Seed) => {
    return seed.slug === params.slug
  })

  if (!seed) throw new Error(`Seed not found for slug: ${params.slug}`)

  const title = `${seed.title} - Garden - Chris Jarling`
  const description = seed.body.raw.slice(0, 150)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: 'https://www.chrisjarling.com/og.jpg',
          secureUrl: 'https://www.chrisjarling.com/og.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

function getBacklinks(slug: string) {
  const backlinkingDocs = allSeeds.filter((seed) =>
    seed.body.raw.includes('[[' + slug)
  ) as Seed[]

  return backlinkingDocs.map((doc) => ({
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    type: doc.type,
  }))
}

export default async function Post({ params }: Params) {
  const seed = allSeeds.find((seed: Seed) => {
    return seed.slug === params.slug
  })

  if (!seed) {
    notFound()
  }

  const backlinks = getBacklinks(params.slug)

  return (
    <>
      <div>
        <h2 className="text-neutral-100 font-bold font-headline text-xl mb-4">
          {seed.title}
        </h2>
        {seed.wip && (
          <div className="rounded-lg p-4 mb-6 bg-rose-bud-700/10 border border-rose-bud-900 text-rose-bud-200 text-sm">
            This page is still work in progress. Information might be
            incomplete, formatting and grammar might be off.
          </div>
        )}
        <StyledArticleContent contentHtml={seed.body.html} />
        {backlinks.length > 0 && (
          <>
            <h2 className="text-lg font-bold mb-4">Backlinks</h2>
            <div className="grid grid-cols-2">
              {backlinks.map((backlink) => (
                <Link
                  key={backlink.slug}
                  className="p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700"
                  href={`/digital-garden/${backlink.slug}`}
                >
                  <span className="block mb-2 font-bold">{backlink.title}</span>
                  {backlink.excerpt && (
                    <span className="text-sm">{backlink.excerpt}</span>
                  )}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}
