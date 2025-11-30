# Plan: Add OS and Country Detection to Analytics

## Overview

Add OS and country detection to the existing analytics system by:
- Using MaxMind GeoLite2 database for country detection (local, fast lookups)
- Parsing the User-Agent header for OS detection
- Storing only processed data (not raw User-Agent or IP) for privacy

## Files to Modify/Create

1. `data/db/schema.ts` - Add `os` and `country` columns to events table
2. `lib/user-agent.ts` - New file for User-Agent parsing utility
3. `lib/geo.ts` - New file for MaxMind geo-IP lookup
4. `app/actions.ts` - Access headers and extract OS/country
5. `data/events.repo.ts` - Update `add()` method, add aggregation queries
6. `data/events.dto.ts` - Update function signatures, add breakdown queries
7. `app/analytics/page.tsx` - Display OS and country breakdowns

## Dependencies to Add

```bash
pnpm add maxmind @types/maxmind
```

## MaxMind GeoLite2 Setup

1. Register at https://www.maxmind.com/en/geolite2/signup for a free license key
2. Download GeoLite2-Country.mmdb database
3. Place in project (e.g., `data/GeoLite2-Country.mmdb`) or configure path via env var
4. Add to `.gitignore` if not committing the database file

## Implementation Steps

### Step 1: Update Database Schema

Add two nullable columns to `eventsTable` in `data/db/schema.ts`:

```typescript
os: varchar({ length: 50 }),        // e.g., "macOS", "Windows", "iOS"
country: varchar({ length: 2 }),    // ISO 3166-1 alpha-2 code, e.g., "US"
```

Then generate and run the migration:
```bash
pnpm db:generate && pnpm db:migrate
```

### Step 2: Create User-Agent Parser

Create `lib/user-agent.ts` with a simple parser:

```typescript
export function parseOS(userAgent: string | null): string | null {
  if (!userAgent) return null
  const ua = userAgent.toLowerCase()

  if (ua.includes('iphone') || ua.includes('ipad')) return 'iOS'
  if (ua.includes('android')) return 'Android'
  if (ua.includes('mac os x') || ua.includes('macintosh')) return 'macOS'
  if (ua.includes('windows')) return 'Windows'
  if (ua.includes('linux')) return 'Linux'
  if (ua.includes('cros')) return 'ChromeOS'

  return 'Unknown'
}
```

### Step 3: Create Geo-IP Lookup Utility

Create `lib/geo.ts`:

```typescript
import maxmind, { CountryResponse, Reader } from 'maxmind'
import path from 'path'

let reader: Reader<CountryResponse> | null = null

async function getReader(): Promise<Reader<CountryResponse>> {
  if (!reader) {
    const dbPath = process.env.MAXMIND_DB_PATH || path.join(process.cwd(), 'data', 'GeoLite2-Country.mmdb')
    reader = await maxmind.open<CountryResponse>(dbPath)
  }
  return reader
}

export async function getCountryFromIP(ip: string | null): Promise<string | null> {
  if (!ip) return null

  // Handle x-forwarded-for which may contain multiple IPs
  const clientIP = ip.split(',')[0].trim()

  // Skip private/local IPs
  if (clientIP === '127.0.0.1' || clientIP === '::1' || clientIP.startsWith('192.168.') || clientIP.startsWith('10.')) {
    return null
  }

  try {
    const lookup = await getReader()
    const result = lookup.get(clientIP)
    return result?.country?.iso_code ?? null
  } catch {
    return null
  }
}
```

### Step 4: Update Server Action

Modify `app/actions.ts` to access headers:

```typescript
import { headers } from 'next/headers'
import { parseOS } from 'lib/user-agent'
import { getCountryFromIP } from 'lib/geo'

export const trackPageView = actionClient
  .inputSchema(trackPageViewInputSchema)
  .action(async ({ parsedInput }) => {
    const headersList = await headers()

    // Get client IP from common proxy headers
    const ip = headersList.get('x-forwarded-for')
            || headersList.get('x-real-ip')
            || null

    // Look up country from IP
    const country = await getCountryFromIP(ip)

    // Parse OS from User-Agent
    const userAgent = headersList.get('user-agent')
    const os = parseOS(userAgent)

    await addPageView({ pathname: parsedInput.pathname, country, os })
  })
```

### Step 5: Update Repository Layer

Update `data/events.repo.ts`:
- Modify `add()` to accept `country` and `os` parameters
- Add `getCountryBreakdown()` and `getOSBreakdown()` methods for aggregated stats

### Step 6: Update DTO Layer

Update `data/events.dto.ts`:
- Update `addPageView()` to pass new fields
- Add `getAnalyticsBreakdown()` function

### Step 7: Update Analytics Page

Update `app/analytics/page.tsx` to display both aggregated stats and per-view details:

**Aggregated breakdowns** (at the top):
- Country breakdown (list of countries with view counts)
- OS breakdown (list of operating systems with view counts)

**Per-view details** (in the recent page views list):
- Show country code and OS alongside each page view entry
- Format: `{url} ({country}) - {os} - {time ago}`

## Environment Configuration

Add to your deployment environment:
```
MAXMIND_DB_PATH=/path/to/GeoLite2-Country.mmdb
```

Or place the database at `data/GeoLite2-Country.mmdb` in the project.

## Testing Notes

- **Local development**: Country will be `null` for localhost IPs (127.0.0.1, ::1)
- **OS detection**: Works locally via User-Agent header
- Add unit tests for `parseOS()` function
- Consider downloading a test IP for geo testing, or mock the maxmind reader

## Privacy Considerations

- Store only processed OS name and country code
- Do not store raw User-Agent strings or IP addresses
- IP is used only momentarily to derive country, then discarded
