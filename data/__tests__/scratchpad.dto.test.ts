import { describe, expect, it, vi } from 'vitest'

// Mock the cms module before importing anything that uses it
vi.mock('../cms', () => ({
  cms: {
    scratchpad: {
      all: vi.fn(),
      get: vi.fn(),
    },
  },
}))

// Mock keystatic config to prevent import errors
vi.mock('../../keystatic.config', () => ({
  default: {},
}))

// Mock Markdoc to avoid validation issues in tests
vi.mock('@markdoc/markdoc', () => ({
  default: {
    validate: vi.fn().mockReturnValue([]),
    transform: vi.fn().mockReturnValue({ type: 'div', children: [] }),
  },
}))

import { cms } from '../cms'
import { getPaginatedScratchpad, getScratchpadEntry } from '../scratchpad.dto'

describe('getScratchpadEntry', () => {
  it('returns null when entry does not exist', async () => {
    vi.mocked(cms.scratchpad.get).mockResolvedValue(null)

    const result = await getScratchpadEntry('non-existent-slug')

    expect(result).toBeNull()
    expect(cms.scratchpad.get).toHaveBeenCalledWith('non-existent-slug')
  })

  it('returns entry data when entry exists', async () => {
    const mockEntry = {
      id: 'sample-entry-slug',
      timestamp: '2024-01-15T14:30:00Z',
      content: vi.fn().mockResolvedValue({
        node: {
          name: 'document',
          attributes: {},
          children: [],
        },
      }),
    }

    vi.mocked(cms.scratchpad.get).mockResolvedValue(mockEntry)

    const result = await getScratchpadEntry('sample-entry-slug')

    expect(result).not.toBeNull()
    expect(result?.timestamp).toBe('2024-01-15T14:30:00Z')
    expect(result?.formattedDate).toContain('15th Jan, 2024')
    expect(result?.renderableContent).toBeDefined()
  })
})

describe('getPaginatedScratchpad', () => {
  it('returns first page with 10 entries when page is 1', async () => {
    const mockEntries = Array.from({ length: 15 }, (_, i) => ({
      slug: `entry-${15 - i}`,
      entry: {
        id: `entry-${15 - i}`,
        timestamp: `2024-01-${String(15 - i).padStart(2, '0')}T10:00:00Z`,
        content: vi.fn(),
      },
    }))

    vi.mocked(cms.scratchpad.all).mockResolvedValue(mockEntries as any)

    const result = await getPaginatedScratchpad(1)

    expect(result.entries).toHaveLength(10)
    expect(result.pagination.currentPage).toBe(1)
    expect(result.pagination.totalPages).toBe(2)
    expect(result.pagination.hasNextPage).toBe(true)
  })

  it('returns second page with remaining entries', async () => {
    const mockEntries = Array.from({ length: 15 }, (_, i) => ({
      slug: `entry-${15 - i}`,
      entry: {
        id: `entry-${15 - i}`,
        timestamp: `2024-01-${String(15 - i).padStart(2, '0')}T10:00:00Z`,
        content: vi.fn(),
      },
    }))

    vi.mocked(cms.scratchpad.all).mockResolvedValue(mockEntries as any)

    const result = await getPaginatedScratchpad(2)

    expect(result.entries).toHaveLength(5)
    expect(result.pagination.currentPage).toBe(2)
    expect(result.pagination.totalPages).toBe(2)
    expect(result.pagination.hasNextPage).toBe(false)
  })

  it('sorts entries by timestamp descending (newest first)', async () => {
    const mockEntries = [
      {
        slug: 'entry-one',
        entry: {
          id: 'entry-one',
          timestamp: '2024-01-10T10:00:00Z',
          content: vi.fn(),
        },
      },
      {
        slug: 'entry-two',
        entry: {
          id: 'entry-two',
          timestamp: '2024-01-15T10:00:00Z',
          content: vi.fn(),
        },
      },
      {
        slug: 'entry-three',
        entry: {
          id: 'entry-three',
          timestamp: '2024-01-12T10:00:00Z',
          content: vi.fn(),
        },
      },
    ]

    vi.mocked(cms.scratchpad.all).mockResolvedValue(mockEntries as any)

    const result = await getPaginatedScratchpad(1)

    expect(result.entries[0].slug).toBe('entry-two')
    expect(result.entries[1].slug).toBe('entry-three')
    expect(result.entries[2].slug).toBe('entry-one')
  })

  it('returns empty array when page exceeds available pages', async () => {
    const mockEntries = Array.from({ length: 5 }, (_, i) => ({
      slug: `entry-${5 - i}`,
      entry: {
        id: `entry-${5 - i}`,
        timestamp: `2024-01-${String(5 - i).padStart(2, '0')}T10:00:00Z`,
        content: vi.fn(),
      },
    }))

    vi.mocked(cms.scratchpad.all).mockResolvedValue(mockEntries as any)

    const result = await getPaginatedScratchpad(5)

    expect(result.entries).toHaveLength(0)
    expect(result.pagination.hasNextPage).toBe(false)
  })

  it('handles empty scratchpad', async () => {
    vi.mocked(cms.scratchpad.all).mockResolvedValue([])

    const result = await getPaginatedScratchpad(1)

    expect(result.entries).toHaveLength(0)
    expect(result.pagination.totalPages).toBe(0)
    expect(result.pagination.hasNextPage).toBe(false)
  })
})
