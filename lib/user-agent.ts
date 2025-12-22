import { UAParser } from 'ua-parser-js'

export function parseOS(userAgent: string | null) {
  if (!userAgent) return null

  const parser = UAParser(userAgent)
  const os = parser.os

  if (!os.name) return null

  if (os.name === 'Mac OS') return 'macOS'
  return os.name
}
