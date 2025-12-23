import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import fs from 'fs'
import os from 'os'
import path from 'path'
import * as tar from 'tar'

import { getLogger } from './logger'

const log = getLogger()
const DB_KEY = 'GeoLite2-Country.mmdb'

function hasBucketConfig(): boolean {
  return !!(process.env.AWS_S3_BUCKET_NAME && process.env.AWS_ACCESS_KEY_ID)
}

function createS3Client(): S3Client {
  return new S3Client({
    region: 'auto',
    endpoint: process.env.AWS_ENDPOINT_URL,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })
}

function ensureDataDir(dbPath: string): void {
  const dataDir = path.dirname(dbPath)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

async function checkBucketFileExists(): Promise<boolean> {
  try {
    const s3Client = createS3Client()
    const command = new HeadObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: DB_KEY,
    })
    await s3Client.send(command)
    return true
  } catch (error) {
    // NoSuchKey or NotFound means file doesn't exist
    if (
      error instanceof Error &&
      (error.name === 'NotFound' || error.name === 'NoSuchKey')
    ) {
      return false
    }
    // Re-throw unexpected errors
    throw error
  }
}

async function downloadFromBucket(dbPath: string): Promise<void> {
  log.info('Downloading MaxMind database from Railway Bucket...')

  const s3Client = createS3Client()
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: DB_KEY,
  })

  const response = await s3Client.send(command)

  if (!response.Body) {
    throw new Error('No data received from bucket')
  }

  ensureDataDir(dbPath)
  const bodyContents = await response.Body.transformToByteArray()
  fs.writeFileSync(dbPath, bodyContents)

  log.info(`MaxMind database downloaded successfully to ${dbPath}`)
}

async function downloadFromMaxMind(): Promise<Uint8Array> {
  const licenseKey = process.env.MAXMIND_LICENSE_KEY
  if (!licenseKey) {
    throw new Error('MAXMIND_LICENSE_KEY is not set')
  }

  const url = `https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-Country&license_key=${licenseKey}&suffix=tar.gz`

  log.info('Downloading MaxMind database from MaxMind API...')

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(
      `MaxMind download failed: ${response.status} ${response.statusText}`,
    )
  }

  const arrayBuffer = await response.arrayBuffer()

  // Extract the .mmdb file from the tar.gz to a temp directory
  // The archive contains: GeoLite2-Country_YYYYMMDD/GeoLite2-Country.mmdb
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'maxmind-'))
  const tarPath = path.join(tempDir, 'maxmind.tar.gz')

  try {
    // Write tar.gz to temp file
    fs.writeFileSync(tarPath, new Uint8Array(arrayBuffer))

    // Extract using tar
    await tar.extract({
      file: tarPath,
      cwd: tempDir,
      filter: (p) => p.endsWith('.mmdb'),
    })

    // Find the extracted .mmdb file (it's in a subdirectory like GeoLite2-Country_20231215/)
    const subdirs = fs
      .readdirSync(tempDir)
      .filter((f) => fs.statSync(path.join(tempDir, f)).isDirectory())

    for (const subdir of subdirs) {
      const mmdbPath = path.join(tempDir, subdir, 'GeoLite2-Country.mmdb')
      if (fs.existsSync(mmdbPath)) {
        const buffer = fs.readFileSync(mmdbPath)
        return new Uint8Array(
          buffer.buffer,
          buffer.byteOffset,
          buffer.byteLength,
        )
      }
    }

    throw new Error('No .mmdb file found in archive')
  } finally {
    // Clean up temp directory
    fs.rmSync(tempDir, { recursive: true, force: true })
  }
}

async function uploadToBucket(data: Uint8Array): Promise<void> {
  log.info('Uploading MaxMind database to Railway Bucket...')

  const s3Client = createS3Client()
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: DB_KEY,
    Body: data,
    ContentType: 'application/octet-stream',
  })

  await s3Client.send(command)
  log.info('MaxMind database uploaded to bucket successfully')
}

/**
 * Ensures the MaxMind database is available locally.
 * Flow:
 * 1. If local file exists → done
 * 2. If file exists in bucket → download to local
 * 3. If not in bucket → download from MaxMind API, upload to bucket, save locally
 */
export async function downloadMaxMindDatabase(): Promise<void> {
  // Skip in development or if no bucket configured
  if (process.env.NODE_ENV !== 'production' || !hasBucketConfig()) {
    log.info(
      'Skipping MaxMind database download (not in production with bucket)',
    )
    return
  }

  const dbPath = path.join(process.cwd(), 'data', 'GeoLite2-Country.mmdb')

  // 1. Check if local file exists
  if (fs.existsSync(dbPath)) {
    log.info('MaxMind database already exists locally')
    return
  }

  try {
    // 2. Check if file exists in bucket
    const existsInBucket = await checkBucketFileExists()

    if (existsInBucket) {
      await downloadFromBucket(dbPath)
      return
    }

    // 3. File not in bucket - download from MaxMind and upload
    if (!process.env.MAXMIND_LICENSE_KEY) {
      log.warn(
        'MaxMind database not in bucket and no MAXMIND_LICENSE_KEY set - country detection disabled',
      )
      return
    }

    const mmdbData = await downloadFromMaxMind()

    // Upload to bucket (so other instances can use it)
    try {
      await uploadToBucket(mmdbData)
    } catch (uploadError) {
      log
        .withError(uploadError as Error)
        .error('Failed to upload to bucket, continuing with local save')
    }

    // Save locally
    ensureDataDir(dbPath)
    fs.writeFileSync(dbPath, mmdbData)
    log.info('MaxMind database downloaded from MaxMind API and saved locally')
  } catch (error) {
    log.withError(error as Error).error('Failed to setup MaxMind database')
    log.warn('Country detection will be disabled')
  }
}
