import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { loadEnvConfig } from '@next/env'
import sharp from 'sharp'

import type { WebsiteImagesRepository as Repo } from '../data/website-images.repo'

loadEnvConfig(process.cwd(), true)

const IMAGE_DIR = join(process.cwd(), 'public/website-og-images')

async function getRepo(): Promise<typeof Repo> {
  const mod = await import('../data/website-images.repo')
  return mod.WebsiteImagesRepository
}

function detectMimeType(data: Buffer): string {
  if (data[0] === 0x89 && data[1] === 0x50) return 'image/png'
  if (data[0] === 0xff && data[1] === 0xd8) return 'image/jpeg'
  if (
    data[0] === 0x52 &&
    data[1] === 0x49 &&
    data[2] === 0x46 &&
    data[3] === 0x46
  )
    return 'image/webp'
  if (data[0] === 0x47 && data[1] === 0x49 && data[2] === 0x46)
    return 'image/gif'
  if (data[0] === 0x00 && data[1] === 0x00 && data[2] === 0x01)
    return 'image/x-icon'

  const text = data.subarray(0, 500).toString('utf-8')
  if (text.includes('<svg') || text.includes('<?xml')) return 'image/svg+xml'

  return 'image/png'
}

async function main() {
  const repo = await getRepo()

  let files: string[]
  try {
    files = await readdir(IMAGE_DIR)
  } catch {
    console.error(`Directory not found: ${IMAGE_DIR}`)
    process.exit(1)
  }

  const imageFiles = files.filter((f) =>
    /\.(png|jpe?g|webp|gif|svg|ico)$/i.test(f),
  )

  console.log(`Found ${imageFiles.length} image files to migrate\n`)

  let migrated = 0
  let failed = 0

  for (const file of imageFiles) {
    const dotIndex = file.indexOf('.')
    const name = file.slice(0, dotIndex)

    const isFavicon = name.endsWith('-favicon')
    const slug = isFavicon ? name.slice(0, -'-favicon'.length) : name
    const imageType = isFavicon ? 'favicon' : 'og'

    console.log(`Migrating: ${file} (slug=${slug}, type=${imageType})`)

    try {
      const data = await readFile(join(IMAGE_DIR, file))
      const detectedMime = detectMimeType(data)

      let imageBuffer: Buffer
      let mimeType: string

      if (imageType === 'og' && detectedMime !== 'image/svg+xml') {
        imageBuffer = await sharp(data)
          .resize(512, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer()
        mimeType = 'image/webp'
      } else {
        imageBuffer = data
        mimeType = detectedMime
      }

      await repo.upsert({
        slug,
        imageType: imageType as 'og' | 'favicon',
        mimeType,
        imageData: imageBuffer,
      })

      console.log(
        `  OK (${(data.length / 1024).toFixed(1)} KB -> ${(imageBuffer.length / 1024).toFixed(1)} KB)`,
      )
      migrated++
    } catch (error) {
      console.error(`  Failed: ${(error as Error).message}`)
      failed++
    }
  }

  console.log(`\nDone! Migrated: ${migrated}, Failed: ${failed}`)
  process.exit(0)
}

main().catch((error) => {
  console.error('Migration failed:', error.message)
  process.exit(1)
})
