import { clerkClient, getAuth } from '@clerk/nextjs/server'
import { NextApiRequest } from 'next'

export const apiAuth = async (req: NextApiRequest) => {
  const { userId } = getAuth(req)
  const user = userId ? await clerkClient.users.getUser(userId) : undefined

  if (
    !user ||
    user.emailAddresses[0].emailAddress !== process.env.ADMIN_EMAIL_ADDRESS
  ) {
    throw new Error('Who do you think you are')
  }
}
