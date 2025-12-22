import { getCountryFromIP } from 'lib/geo'
import { parseOS } from 'lib/user-agent'
import { headers } from 'next/headers'

import { EventsRepository } from './events.repo'

export async function addPageView({ pathname }: { pathname: string }) {
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || null
  const userAgent = headersList.get('user-agent')

  const country = ip ? await getCountryFromIP(ip) : null
  const os = parseOS(userAgent)

  // TODO: Define return value and log errors
  await EventsRepository.add({ url: pathname, country, os })
}

export async function getAnalyticsOverview() {
  const totalEventsCount = await EventsRepository.totalCount()
  const recentPageViews = await EventsRepository.getAll({ limit: 20 })

  return {
    totalCount: totalEventsCount,
    pageViews: recentPageViews,
  }
}
