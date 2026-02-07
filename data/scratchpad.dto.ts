import Markdoc from '@markdoc/markdoc'
import { format, parseISO } from 'date-fns'
import { getLogger } from 'lib/logger'

import { cms } from './cms'

const log = getLogger()

const ENTRIES_PER_PAGE = 10

export type ScratchpadEntries = Awaited<ReturnType<typeof cms.scratchpad.all>>
export type ScratchpadEntry = NonNullable<
  Awaited<ReturnType<typeof cms.scratchpad.get>>
>

export async function getPaginatedScratchpad(page: number = 1) {
  const allEntries = await cms.scratchpad.all()

  // Sort by timestamp descending - newest first
  const sortedEntries = [...allEntries].sort((a, b) => {
    return b.entry.timestamp.localeCompare(a.entry.timestamp)
  })

  // Calculate pagination
  const totalEntries = sortedEntries.length
  const totalPages = Math.ceil(totalEntries / ENTRIES_PER_PAGE)
  const startIndex = (page - 1) * ENTRIES_PER_PAGE
  const endIndex = startIndex + ENTRIES_PER_PAGE

  // Get entries for current page
  const entries = sortedEntries.slice(startIndex, endIndex)

  return {
    entries,
    pagination: {
      currentPage: page,
      totalPages,
      totalEntries,
      hasNextPage: page < totalPages,
    },
  }
}

export async function getScratchpadEntry(slug: string) {
  const entry = await cms.scratchpad.get(slug)

  if (!entry) {
    return null
  }

  // Parse timestamp from entry
  const timestamp = parseISO(entry.timestamp)
  const formattedDate = format(timestamp, "do LLL, yyyy 'at' HH:mm")

  const { node } = await entry.content()
  const errors = Markdoc.validate(node)
  if (errors.length) {
    log.error(errors.join(','))
    return null
  }

  const renderableContent = Markdoc.transform(node)

  return {
    timestamp: entry.timestamp,
    formattedDate,
    renderableContent,
  }
}
