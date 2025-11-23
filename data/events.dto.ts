import { EventsRepository } from './events.repo'

export async function addPageView({ pathname }: { pathname: string }) {
  // TODO: Define return value and log errors
  await EventsRepository.add({ url: pathname })
}

export async function getAnalyticsOverview() {
  const totalEventsCount = await EventsRepository.totalCount()
  const recentPageViews = await EventsRepository.getAll({ limit: 20 })

  return {
    totalCount: totalEventsCount,
    pageViews: recentPageViews,
  }
}
