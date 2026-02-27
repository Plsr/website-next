import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { loadEnvConfig } from '@next/env'
import yaml from 'js-yaml'
import sharp from 'sharp'

import type { WebsiteImagesRepository as Repo } from '../data/website-images.repo'

loadEnvConfig(process.cwd(), true)

const CONTENT_DIR = join(process.cwd(), 'content/websites')

async function getRepo(): Promise<typeof Repo> {
  // Dynamic import after env is loaded so DATABASE_URL is available
  const mod = await import('../data/website-images.repo')
  return mod.WebsiteImagesRepository
}

interface WebsiteEntry {
  title: string
  url: string
}

function extractOgImage(html: string): string | null {
  const match = html.match(
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i,
  )
  if (match) return match[1]

  const match2 = html.match(
    /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i,
  )
  if (match2) return match2[1]

  return null
}

function extractFaviconUrl(html: string, baseUrl: string): string {
  const patterns = [
    /<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["'][^>]*>/i,
    /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']apple-touch-icon["'][^>]*>/i,
    /<link[^>]*rel=["']icon["'][^>]*href=["']([^"']+)["'][^>]*>/i,
    /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']icon["'][^>]*>/i,
    /<link[^>]*rel=["']shortcut icon["'][^>]*href=["']([^"']+)["'][^>]*>/i,
    /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']shortcut icon["'][^>]*>/i,
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match) {
      return new URL(match[1], baseUrl).href
    }
  }

  return new URL('/favicon.ico', baseUrl).href
}

async function fetchPage(
  url: string,
): Promise<{ html: string; finalUrl: string } | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      console.warn(`  Failed to fetch ${url}: ${response.status}`)
      return null
    }

    return { html: await response.text(), finalUrl: response.url }
  } catch (error) {
    console.warn(`  Error fetching ${url}:`, (error as Error).message)
    return null
  }
}

async function downloadImage(url: string): Promise<Uint8Array | null> {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      console.warn(`  Failed to fetch image ${url}: ${response.status}`)
      return null
    }

    return new Uint8Array(await response.arrayBuffer())
  } catch (error) {
    console.warn(`  Error downloading image ${url}:`, (error as Error).message)
    return null
  }
}

function detectMimeType(data: Uint8Array): string {
  // Check magic bytes
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

  // Check for SVG (text-based)
  const text = new TextDecoder().decode(data.slice(0, 500))
  if (text.includes('<svg') || text.includes('<?xml')) return 'image/svg+xml'

  return 'image/png'
}

async function optimizeOgImage(data: Uint8Array): Promise<Buffer> {
  return await sharp(Buffer.from(data))
    .resize(512, null, { withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer()
}

const forceRefetch = process.argv.includes('--force')

async function main() {
  const repo = await getRepo()

  let entries: string[]
  try {
    entries = await readdir(CONTENT_DIR)
  } catch {
    console.log('No content/websites directory found, skipping OG image fetch.')
    return
  }

  const yamlFiles = entries.filter(
    (f) => f.endsWith('.yaml') || f.endsWith('.yml'),
  )

  if (yamlFiles.length === 0) {
    console.log('No website entries found.')
    return
  }

  console.log(`Found ${yamlFiles.length} website entries\n`)

  let fetched = 0
  let skipped = 0
  let failed = 0

  for (const file of yamlFiles) {
    const slug = file.replace(/\.ya?ml$/, '')
    const content = await readFile(join(CONTENT_DIR, file), 'utf-8')
    const data = yaml.load(content) as WebsiteEntry

    console.log(`Processing: ${data.title} (${data.url})`)

    if (!forceRefetch && (await repo.exists(slug))) {
      console.log(`  Skipped (already in DB)`)
      skipped++
      continue
    }

    const page = await fetchPage(data.url)
    if (!page) {
      failed++
      continue
    }

    // Try OG image first
    const ogImageUrl = extractOgImage(page.html)
    if (ogImageUrl) {
      const resolvedUrl = new URL(ogImageUrl, page.finalUrl).href
      const imageBytes = await downloadImage(resolvedUrl)
      if (imageBytes) {
        const mime = detectMimeType(imageBytes)
        let imageBuffer: Buffer
        let mimeType: string

        if (mime === 'image/svg+xml') {
          imageBuffer = Buffer.from(imageBytes)
          mimeType = 'image/svg+xml'
        } else {
          imageBuffer = await optimizeOgImage(imageBytes)
          mimeType = 'image/webp'
        }

        await repo.upsert({
          slug,
          imageType: 'og',
          mimeType,
          imageData: imageBuffer,
          originalUrl: resolvedUrl,
        })
        console.log(
          `  Saved OG image to DB (${(imageBuffer.length / 1024).toFixed(1)} KB)`,
        )
        fetched++
        continue
      }
    }

    // Fall back to favicon
    const faviconUrl = extractFaviconUrl(page.html, page.finalUrl)
    console.log(`  No og:image, trying favicon: ${faviconUrl}`)
    const faviconBytes = await downloadImage(faviconUrl)
    if (faviconBytes) {
      const mimeType = detectMimeType(faviconBytes)
      await repo.upsert({
        slug,
        imageType: 'favicon',
        mimeType,
        imageData: Buffer.from(faviconBytes),
        originalUrl: faviconUrl,
      })
      console.log(
        `  Saved favicon to DB (${(faviconBytes.length / 1024).toFixed(1)} KB)`,
      )
      fetched++
    } else {
      console.warn(`  No favicon found either`)
      failed++
    }
  }

  console.log(
    `\nDone! Fetched: ${fetched}, Skipped: ${skipped}, Failed: ${failed}`,
  )
  process.exit(0)
}

main().catch((error) => {
  console.error('OG image fetch failed:', error.message)
  process.exit(1)
})
