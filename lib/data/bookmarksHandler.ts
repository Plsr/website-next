export type BookmarkData = {
  link: string
  title: string
  text: string
}

type CreateBookmarkPayload = BookmarkData & {
  collectionId: number
}

// TODO: Might be a good idea to move to reac query in the future
export const createBookmark = async (payload: CreateBookmarkPayload) => {
  try {
    const body = {
      ...payload,
    }

    const entry = await fetch('/api/entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    return entry
  } catch (error) {
    console.error(error)
  }
}

type UpdateBookmarkPayload = Partial<BookmarkData>

export const updateBookmark = async (
  payload: UpdateBookmarkPayload,
  entryId: number
) => {
  try {
    const body = {
      ...payload,
      entryId,
    }

    const entry = await fetch('/api/entry', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    return entry
  } catch (error) {
    console.error(error)
  }
}
