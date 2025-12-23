import ipaddr from 'ipaddr.js'
import maxmind, { CountryResponse, Reader } from 'maxmind'
import path from 'path'

import { getLogger } from './logger'

const log = getLogger()

let reader: Reader<CountryResponse> | null = null
let readerError: boolean = false // Track if we've already failed to load

async function getReader(): Promise<Reader<CountryResponse> | null> {
  // If we already tried and failed, don't keep retrying
  if (readerError) return null

  if (!reader) {
    try {
      // Use MAXMIND_DB_PATH if set, otherwise /tmp in production (writable in containers)
      // or data/ in development
      const dbPath =
        process.env.MAXMIND_DB_PATH ||
        (process.env.NODE_ENV === 'production'
          ? '/tmp/GeoLite2-Country.mmdb'
          : path.join(process.cwd(), 'data', 'GeoLite2-Country.mmdb'))

      reader = await maxmind.open<CountryResponse>(dbPath)
      log.info(`MaxMind database loaded from: ${dbPath}`)
    } catch (error) {
      readerError = true
      log
        .withError(error as Error)
        .warn('MaxMind database not found. Country detection will be disabled.')
      return null
    }
  }

  return reader
}

function isPrivateIP(ip: string): boolean {
  try {
    const addr = ipaddr.process(ip)
    return (
      addr.range() === 'private' ||
      addr.range() === 'loopback' ||
      addr.range() === 'linkLocal' ||
      addr.range() === 'uniqueLocal'
    )
  } catch {
    return true
  }
}

export async function getCountryFromIP(
  ip: string | null,
): Promise<string | null> {
  if (!ip) return null

  const clientIP = ip.split(',')[0].trim()

  if (isPrivateIP(clientIP)) {
    return null
  }

  try {
    const lookup = await getReader()

    // If database failed to load, gracefully return null
    if (!lookup) return null

    const result = lookup.get(clientIP)
    return result?.country?.iso_code ?? null
  } catch {
    // Handle any lookup errors gracefully
    return null
  }
}
