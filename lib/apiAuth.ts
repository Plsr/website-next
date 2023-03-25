import { clerkClient, getAuth } from '@clerk/nextjs/server'
import { NextApiRequest, NextApiResponse } from 'next'

export const apiAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = getAuth(req)
  const user = userId ? await clerkClient.users.getUser(userId) : undefined

  if (
    !user ||
    user.emailAddresses[0].emailAddress !== process.env.ADMIN_EMAIL_ADDRESS
  ) {
    console.error('Unauthorized api usage')
    res.status(403).send({ error: 'Not authorized' })
    return false
  }

  return true
}
