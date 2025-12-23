import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import fs from 'fs'
import path from 'path'

import { getLogger } from './logger'

const log = getLogger()

/**
 * Downloads the MaxMind database from Railway Bucket on startup.
 * Only runs in production when bucket credentials are available.
 */
export async function downloadMaxMindDatabase(): Promise<void> {
  // Skip in development or if no bucket configured
  if (
    process.env.NODE_ENV !== 'production' ||
    !process.env.AWS_S3_BUCKET_NAME ||
    !process.env.AWS_ACCESS_KEY_ID
  ) {
    log.info(
      'Skipping MaxMind database download (not in production with bucket)',
    )
    return
  }

  const dbPath = path.join(process.cwd(), 'data', 'GeoLite2-Country.mmdb')

  // Check if database already exists (from previous startup)
  if (fs.existsSync(dbPath)) {
    log.info('MaxMind database already exists, skipping download')
    return
  }

  try {
    log.info('Downloading MaxMind database from Railway Bucket...')

    const s3Client = new S3Client({
      endpoint: process.env.AWS_ENDPOINT_URL,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    })

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: 'GeoLite2-Country.mmdb',
    })

    const response = await s3Client.send(command)

    if (!response.Body) {
      throw new Error('No data received from bucket')
    }

    // Ensure data directory exists
    const dataDir = path.dirname(dbPath)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Stream the file to disk
    const bodyContents = await response.Body.transformToByteArray()
    fs.writeFileSync(dbPath, bodyContents)

    log.info(`MaxMind database downloaded successfully to ${dbPath}`)
  } catch (error) {
    log.withError(error as Error).error('Failed to download MaxMind database')
    log.warn('Country detection will be disabled')
  }
}
