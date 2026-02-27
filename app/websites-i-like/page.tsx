import { getAllWebsites, getWebsiteImageMap } from 'data/websites.dto'
import { getLogger } from 'lib/logger'
import { ExternalLink } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Websites I Like - Chris Jarling',
  description: 'A curated collection of websites I enjoy.',
}

export default async function WebsitesILikePage() {
  const websites = await getAllWebsites()

  let imageMap: Record<string, { type: string; dataUri: string }> = {}
  try {
    imageMap = await getWebsiteImageMap()
  } catch (error) {
    getLogger()
      .withError(error as Error)
      .error('Failed to load website images')
  }

  const websitesWithImages = websites.map((website) => {
    let hostname: string
    try {
      hostname = new URL(website.entry.url).hostname
    } catch {
      hostname = website.entry.url
    }
    return {
      ...website,
      image: imageMap[website.slug] ?? null,
      hostname,
    }
  })

  return (
    <>
      <div className="prose prose-invert mb-8">
        <h1>Websites I Like</h1>
        <p>
          A list of websites I like for one reason or another. Could be, because
          I enjoy how they look or are built or what they write about.
        </p>
      </div>

      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
        {websitesWithImages.map((website) => (
          <a
            key={website.slug}
            href={website.entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group -ml-4 -mr-4 flex gap-4 rounded-md px-4 py-3 transition-all hover:bg-base-900/50 md:ml-0 md:mr-0 md:flex-col md:gap-2"
          >
            <div className="h-20 w-32 flex-shrink-0 overflow-hidden rounded bg-base-800 md:h-36 md:w-full">
              {website.image?.type === 'og' ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={website.image.dataUri}
                  alt={website.entry.title}
                  className="h-full w-full object-cover"
                />
              ) : website.image?.type === 'favicon' ? (
                <div className="flex h-full w-full items-center justify-center bg-base-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={website.image.dataUri}
                    alt={website.entry.title}
                    className="h-8 w-8"
                  />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-base-600">
                  No preview
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="font-medium text-base-300 group-hover:text-base-100">
                {website.entry.title}
              </h2>
              <p className="flex items-center gap-1 text-sm text-base-500">
                <ExternalLink className="h-3 w-3" />
                {website.hostname}
              </p>
            </div>
          </a>
        ))}

        {websites.length === 0 && (
          <p className="text-base-500">No websites yet.</p>
        )}
      </div>
    </>
  )
}
