import { unstable_cache } from 'next/cache'

import { cms } from './cms'
import { WebsiteImagesRepository } from './website-images.repo'

export async function getAllWebsites() {
  const websites = await cms.websites.all()

  return websites.sort((a, b) => a.entry.title.localeCompare(b.entry.title))
}

export const getWebsiteImageMap = unstable_cache(
  async () => {
    return await WebsiteImagesRepository.getAllAsDataUriMap()
  },
  ['website-images'],
  { revalidate: 86400 },
)
