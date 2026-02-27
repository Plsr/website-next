import { and, eq } from 'drizzle-orm'

import { db } from './db/db'
import { websiteImagesTable } from './db/schema'

export type ImageType = 'og' | 'favicon'

export class WebsiteImagesRepository {
  constructor() {
    throw new Error('Not meant to be instantiated')
  }

  static async upsert({
    slug,
    imageType,
    mimeType,
    imageData,
    originalUrl,
  }: {
    slug: string
    imageType: ImageType
    mimeType: string
    imageData: Buffer
    originalUrl?: string | null
  }) {
    await db
      .insert(websiteImagesTable)
      .values({
        slug,
        imageType,
        mimeType,
        imageData,
        originalUrl: originalUrl ?? null,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [websiteImagesTable.slug, websiteImagesTable.imageType],
        set: {
          mimeType,
          imageData,
          originalUrl: originalUrl ?? null,
          updatedAt: new Date(),
        },
      })
  }

  static async getAllAsDataUriMap(): Promise<
    Record<string, { type: ImageType; dataUri: string }>
  > {
    const rows = await db
      .select({
        slug: websiteImagesTable.slug,
        imageType: websiteImagesTable.imageType,
        mimeType: websiteImagesTable.mimeType,
        imageData: websiteImagesTable.imageData,
      })
      .from(websiteImagesTable)

    const result: Record<string, { type: ImageType; dataUri: string }> = {}

    for (const row of rows) {
      const existing = result[row.slug]
      // OG images take priority over favicons
      if (existing && existing.type === 'og') continue

      const base64 = row.imageData.toString('base64')
      result[row.slug] = {
        type: row.imageType as ImageType,
        dataUri: `data:${row.mimeType};base64,${base64}`,
      }
    }

    return result
  }

  static async exists(slug: string, imageType?: ImageType): Promise<boolean> {
    const conditions = [eq(websiteImagesTable.slug, slug)]
    if (imageType) {
      conditions.push(eq(websiteImagesTable.imageType, imageType))
    }

    const rows = await db
      .select({ slug: websiteImagesTable.slug })
      .from(websiteImagesTable)
      .where(and(...conditions))
      .limit(1)

    return rows.length > 0
  }
}
