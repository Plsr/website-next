import { NextApiRequest, NextApiResponse } from 'next'
import { apiAuth } from 'lib/apiAuth'
import { prisma } from 'lib/utill/db'
import { siteUrl } from 'lib/utill/site'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

type BookmarksApiRequestBody = {
  title: string
  link: string
  text: string
  entryId?: number
}

export async function POST(request: Request) {
  console.log('called')
  const body = await request.json()
  console.log(body)
  const { title, link, text } = body
  const result = await prisma.bookmark.create({
    data: {
      title,
      link,
      text,
    },
  })

  if (result) {
    revalidatePath('/bookmarks')
  }

  return NextResponse.json(result)
}

export async function PATCH(request: Request) {
  console.log('called')
  const body = await request.json()
  console.log(body)
  const { title, link, text, entryId } = body

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

  revalidatePath('/bookmarks')
  return NextResponse.json(result)
}
