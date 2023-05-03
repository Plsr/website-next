import { NextApiRequest, NextApiResponse } from 'next'
import { apiAuth } from '../../lib/apiAuth'
import { prisma } from '../../lib/utill/db'
import { siteUrl } from '../../lib/utill/site'

type EntryApiRequest = NextApiRequest & {
  body: {
    title: string
    link: string
    text: string
    entryId?: number
  }
}

export default async function handle(
  req: EntryApiRequest,
  res: NextApiResponse
) {
  const { title, link, text, entryId } = req.body

  const authenticated = await apiAuth(req, res)

  if (!authenticated) {
    return
  }

  if (req.method === 'POST') {
    const result = await prisma.bookmark.create({
      data: {
        title,
        link,
        text,
      },
    })
    await res.revalidate('/bookmarks')
    res.json(result)
  }

  if (req.method === 'PATCH') {
    if (!entryId) {
      throw new Error('entryId is required')
    }

    const result = await prisma.entry.update({
      where: {
        id: entryId,
      },
      data: {
        title,
        link,
        text,
      },
    })
    await res.revalidate('/bookmarks')
    res.json(result)
  }
}

async function revalidate() {
  await fetch(
    `${siteUrl}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`
  )
}
