import { NextApiRequest, NextApiResponse } from 'next'
import { apiAuth } from '../../lib/apiAuth'
import { prisma } from '../../lib/utill/db'

type EntryApiRequest = NextApiRequest & {
  body: {
    title: string
    link: string
    text: string
    collectionId: number
    entryId?: number
  }
}

export default async function handle(
  req: EntryApiRequest,
  res: NextApiResponse
) {
  const { title, link, text, collectionId, entryId } = req.body

  await apiAuth(req, res)

  if (req.method === 'POST') {
    const result = await prisma.entry.create({
      data: {
        title,
        link,
        text,
        collection_id: collectionId,
      },
    })
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
    res.json(result)
  }
}
