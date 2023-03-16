import { NextApiRequest, NextApiResponse } from 'next'
import { apiAuth } from '../../lib/apiAuth'
import { prisma } from '../../lib/utill/db'

// POST /api/collection
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.body
  await apiAuth(req)

  const result = await prisma.collection.create({
    data: {
      name,
    },
  })
  res.json(result)
}
