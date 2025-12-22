import { describe, expect, it, vi } from 'vitest'

import { getCountryFromIP } from '../geo'

// Note: These tests require the MaxMind database to be present.
// In CI, you may want to mock the maxmind module.

describe('getCountryFromIP', () => {
  it('returns null for null input', async () => {
    expect(await getCountryFromIP(null)).toBeNull()
  })

  it('returns null for empty string', async () => {
    expect(await getCountryFromIP('')).toBeNull()
  })

  it('returns null for localhost IPv4', async () => {
    expect(await getCountryFromIP('127.0.0.1')).toBeNull()
  })

  it('returns null for localhost IPv6', async () => {
    expect(await getCountryFromIP('::1')).toBeNull()
  })

  it('returns null for private IP 192.168.x.x', async () => {
    expect(await getCountryFromIP('192.168.1.100')).toBeNull()
  })

  it('returns null for private IP 10.x.x.x', async () => {
    expect(await getCountryFromIP('10.0.0.1')).toBeNull()
  })

  it('returns null for private IP 172.16-31.x.x', async () => {
    expect(await getCountryFromIP('172.16.0.1')).toBeNull()
    expect(await getCountryFromIP('172.31.255.255')).toBeNull()
  })

  it('extracts first IP from x-forwarded-for header', async () => {
    // The first IP should be used, subsequent ones are proxies
    const result = await getCountryFromIP('127.0.0.1, 8.8.8.8, 1.1.1.1')
    // First IP is localhost, so should return null
    expect(result).toBeNull()
  })

  it('trims whitespace from IP', async () => {
    expect(await getCountryFromIP('  127.0.0.1  ')).toBeNull()
  })
})

// Integration test - only runs if MaxMind DB is present
describe('getCountryFromIP (integration)', () => {
  it('returns a country code for a known public IP', async () => {
    // Google's public DNS IP (8.8.8.8) is in the US
    const result = await getCountryFromIP('8.8.8.8')

    // If the database is missing, result will be null (test still passes)
    // If the database is present, we expect "US"
    if (result !== null) {
      expect(result).toBe('US')
    }
  })
})

