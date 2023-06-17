import { filterBySeriesName, getSortedAndFilteredEntries } from './entries'
import { siteUrl } from './utill/site'

export type SeriesEntry = {
  title: string
  url: string
  id: string
}

export const postSeriesList = async (
  seriesName: string
): Promise<SeriesEntry[]> => {
  const seriesEntries = await getSortedAndFilteredEntries({
    filterString: seriesName,
    filterFunction: filterBySeriesName,
    entryType: 'posts',
  })

  return seriesEntries
    .map((entry) => {
      const url = `${siteUrl}/post/${entry.id}`

      return {
        title: entry.title,
        url,
        id: entry.id,
      }
    })
    .reverse()
}
