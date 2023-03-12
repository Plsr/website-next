import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/utill/db'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.body

  const result = await prisma.collection.create({
    data: {
      name,
    },
  })
  res.json(result)
}
