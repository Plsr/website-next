import { describe, expect, it } from 'vitest'

import { parseOS } from '../user-agent'

describe('parseOS', () => {
  it('returns null for null input', () => {
    expect(parseOS(null)).toBeNull()
  })

  it('returns null for empty string', () => {
    expect(parseOS('')).toBeNull()
  })

  it('detects macOS from Chrome on Mac', () => {
    const ua =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    expect(parseOS(ua)).toBe('macOS')
  })

  it('detects Windows from Edge on Windows', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
    expect(parseOS(ua)).toBe('Windows')
  })

  it('detects iOS from Safari on iPhone', () => {
    const ua =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
    expect(parseOS(ua)).toBe('iOS')
  })

  it('detects iOS from Safari on iPad (desktop mode)', () => {
    // iPads in desktop mode sometimes report as Macintosh, but include "iPad"
    const ua =
      'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
    expect(parseOS(ua)).toBe('iOS')
  })

  it('detects Android from Chrome on Android', () => {
    const ua =
      'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
    expect(parseOS(ua)).toBe('Android')
  })

  it('detects Linux from Firefox on Linux', () => {
    const ua =
      'Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0'
    expect(parseOS(ua)).toBe('Linux')
  })

  it('detects ChromeOS', () => {
    const ua =
      'Mozilla/5.0 (X11; CrOS x86_64 15359.58.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    expect(parseOS(ua)).toBe('Chrome OS')
  })

  it('returns null for unrecognized User-Agent', () => {
    const ua = 'SomeBot/1.0'
    expect(parseOS(ua)).toBeNull()
  })
})
