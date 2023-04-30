export type BookmarkData = {
  link: string
  title: string
  text: string
}

// TODO: Might be a good idea to move to react query in the future
export const createBookmark = async (payload: BookmarkData) => {
  try {
    const body = {
      ...payload,
    }

    const entry = await fetch('/api/bookmark', {
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

    const entry = await fetch('/api/bookmark', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    return entry
  } catch (error) {
    console.error(error)
  }
}
