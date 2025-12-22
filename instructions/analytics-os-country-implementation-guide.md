# Implementation Guide: Adding OS and Country Detection to Analytics

This tutorial walks you through adding operating system (OS) and country detection to an existing analytics system. By the end, you'll have a working feature that:

- Detects the visitor's OS from their User-Agent header
- Looks up the visitor's country from their IP address using MaxMind's GeoLite2 database
- Stores this data alongside page views (without storing raw IP or User-Agent for privacy)
- Displays breakdown statistics on the analytics page

**Prerequisites**: You should be comfortable with TypeScript, Next.js, and basic SQL concepts.

---

## Background

### Why OS and Country Detection?

Understanding where your visitors come from and what devices they use helps you:
- Prioritize browser/OS testing based on actual usage
- Identify geographic audiences for content decisions
- Spot unusual traffic patterns

### Privacy-First Approach

We'll extract only two pieces of derived data:
- **OS**: A simple string like "macOS", "Windows", "iOS"
- **Country**: A 2-letter ISO code like "US", "GB", "DE"

We never store raw User-Agent strings or IP addresses. The IP is used momentarily to look up the country, then discarded.

### Technologies Used

- **MaxMind GeoLite2**: A free, local IP-to-country database (no external API calls)
- **User-Agent parsing**: Simple string matching (no heavy library needed)
- **Drizzle ORM**: For database schema changes and queries
- **Next.js headers()**: To access request headers in server actions

---

## Milestone 1: Update the Database Schema

**Goal**: Add `os` and `country` columns to the events table.

**Verification**: Migration runs successfully and you can see the new columns in your database.

### Step 1.1: Modify the Schema

Open `data/db/schema.ts` and add two new columns to the `eventsTable`:

```typescript
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const eventsTable = pgTable('events', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 255 }).notNull(),
  createdAt: timestamp({ precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
  // NEW: Add these two columns
  os: varchar({ length: 50 }),        // e.g., "macOS", "Windows", "iOS"
  country: varchar({ length: 2 }),    // ISO 3166-1 alpha-2 code, e.g., "US"
})
```

**Why nullable?** We make these columns nullable (no `.notNull()`) because:
1. Existing rows won't have this data
2. Local development won't have country data (localhost IPs can't be geolocated)
3. Some User-Agents may be unparseable

### Step 1.2: Generate the Migration

Run the Drizzle migration generator:

```bash
pnpm db:generate
```

This creates a new migration file in your `drizzle/` folder. Open it and verify it contains something like:

```sql
ALTER TABLE "events" ADD COLUMN "os" varchar(50);
ALTER TABLE "events" ADD COLUMN "country" varchar(2);
```

### Step 1.3: Run the Migration

Apply the migration to your database:

```bash
pnpm db:migrate
```

### Step 1.4: Verify

Connect to your database and confirm the columns exist:

```bash
# If using psql:
psql $DATABASE_URL -c "\d events"
```

You should see `os` and `country` columns listed.

**Checkpoint**: Your database now has the new columns. Existing analytics data is preserved, and the new columns are NULL for old rows.

---

## Milestone 2: Create the User-Agent Parser

**Goal**: Build a utility function that extracts the OS name from a User-Agent string.

**Verification**: Unit tests pass for the parser.

### Step 2.1: Install the UA Parser Library

First, install `ua-parser-js`, a well-maintained library with 10M+ weekly downloads:

```bash
pnpm add ua-parser-js
pnpm add -D @types/ua-parser-js
```

### Step 2.2: Create the Parser File

Create a new file `lib/user-agent.ts`:

```typescript
import UAParser from 'ua-parser-js'

/**
 * Parses a User-Agent string and returns the detected operating system.
 * Returns null if the User-Agent is missing or unrecognized.
 * 
 * Uses ua-parser-js for accurate, battle-tested UA parsing that handles
 * thousands of edge cases and stays updated with new devices/OS versions.
 */
export function parseOS(userAgent: string | null): string | null {
  if (!userAgent) return null

  const parser = new UAParser(userAgent)
  const os = parser.getOS()
  
  // os.name examples: "iOS", "Android", "Mac OS", "Windows", "Linux", "ChromeOS"
  // Return null for completely unknown OS
  if (!os.name) return null
  
  // Normalize OS names to be consistent
  const osName = os.name
  if (osName === 'Mac OS') return 'macOS'
  
  return osName
}
```

**Benefits of using `ua-parser-js`:**
- ✅ Handles complex edge cases (e.g., iPad reporting as Mac, various Android manufacturers)
- ✅ Regular updates for new devices and OS versions
- ✅ Can extract additional info (browser, device type, CPU architecture) if needed later
- ✅ Battle-tested in production by millions of sites
- ✅ TypeScript support included

**Why this order?**
- iPads running Safari sometimes include "Macintosh" in their User-Agent
- We check for `iphone`/`ipad` first to correctly identify iOS devices

### Step 2.2: Write Unit Tests

Create a test file `lib/__tests__/user-agent.test.ts`:

```typescript
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
    expect(parseOS(ua)).toBe('ChromeOS')
  })

  it('returns Unknown for unrecognized User-Agent', () => {
    const ua = 'SomeBot/1.0'
    expect(parseOS(ua)).toBe('Unknown')
  })

  it('is case-insensitive', () => {
    expect(parseOS('WINDOWS NT 10.0')).toBe('Windows')
    expect(parseOS('MACINTOSH')).toBe('macOS')
  })
})
```

### Step 2.3: Run Tests

```bash
pnpm test lib/__tests__/user-agent.test.ts
```

You should see all tests pass:

```
 ✓ lib/__tests__/user-agent.test.ts (11 tests)
```

**Checkpoint**: You have a tested, working User-Agent parser.

---

## Milestone 3: Set Up MaxMind Geo-IP Lookup

**Goal**: Create a utility that looks up a country code from an IP address using MaxMind's GeoLite2 database.

**Verification**: The utility correctly handles edge cases (localhost, invalid IPs) and returns country codes for valid public IPs.

### Step 3.1: Install the Required Libraries

```bash
pnpm add maxmind ipaddr.js
pnpm add -D @types/maxmind @types/ipaddr.js
```

**Why these libraries?**
- `maxmind`: Fast, local IP-to-country lookup (no API calls needed)
- `ipaddr.js`: Robust IP address parsing and range checking (handles IPv4/IPv6 properly)

### Step 3.2: Download the GeoLite2 Database

1. Register for a free account at https://www.maxmind.com/en/geolite2/signup
2. After verifying your email, go to "Download Files" in your account
3. Download "GeoLite2 Country" in MMDB format
4. Extract and place the `.mmdb` file at `data/GeoLite2-Country.mmdb`

**Important**: Add this file to `.gitignore` since it's a large binary:

```bash
echo "data/GeoLite2-Country.mmdb" >> .gitignore
```

For production, you'll configure the path via an environment variable.

### Step 3.3: Create the Geo-IP Utility

Create `lib/geo.ts`:

```typescript
import ipaddr from 'ipaddr.js'
import maxmind, { CountryResponse, Reader } from 'maxmind'
import path from 'path'

// Module-level cache for the database reader
let reader: Reader<CountryResponse> | null = null
let readerError: boolean = false // Track if we've already failed to load

/**
 * Lazily initializes and returns the MaxMind database reader.
 * The reader is cached after first initialization.
 * Returns null if the database cannot be loaded (graceful degradation).
 */
async function getReader(): Promise<Reader<CountryResponse> | null> {
  // If we already tried and failed, don't keep retrying
  if (readerError) return null
  
  if (!reader) {
    try {
      const dbPath =
        process.env.MAXMIND_DB_PATH ||
        path.join(process.cwd(), 'data', 'GeoLite2-Country.mmdb')
      
      reader = await maxmind.open<CountryResponse>(dbPath)
      console.log(`MaxMind database loaded from: ${dbPath}`)
    } catch (error) {
      readerError = true
      console.warn(
        'MaxMind database not found. Country detection will be disabled.',
        error instanceof Error ? error.message : error
      )
      return null
    }
  }

  return reader
}

/**
 * Checks if an IP address is private/local (not routable on the internet).
 * 
 * Uses ipaddr.js to properly parse and check IP ranges:
 * - IPv4: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 127.0.0.0/8
 * - IPv6: ::1/128, fe80::/10, fc00::/7
 */
function isPrivateIP(ip: string): boolean {
  try {
    const addr = ipaddr.process(ip)
    // ipaddr.js has built-in range checking methods
    return (
      addr.range() === 'private' ||
      addr.range() === 'loopback' ||
      addr.range() === 'linkLocal' ||
      addr.range() === 'uniqueLocal'
    )
  } catch {
    // Invalid IP format
    return true // Treat invalid IPs as "private" to skip them
  }
}

/**
 * Looks up the country for a given IP address.
 *
 * @param ip - The IP address, possibly from x-forwarded-for (comma-separated list)
 * @returns The ISO 3166-1 alpha-2 country code (e.g., "US"), or null if:
 *          - The IP is null/empty
 *          - The IP is a private/local address
 *          - The lookup fails or returns no country
 */
export async function getCountryFromIP(
  ip: string | null
): Promise<string | null> {
  if (!ip) return null

  // Handle x-forwarded-for which may contain multiple IPs (client, proxy1, proxy2, ...)
  // The first IP is the original client
  const clientIP = ip.split(',')[0].trim()

  // Skip private/local IPs - they can't be geolocated
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
```

### Step 3.4: Write Unit Tests

Create `lib/__tests__/geo.test.ts`:

```typescript
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
```

### Step 3.5: Run Tests

```bash
pnpm test lib/__tests__/geo.test.ts
```

The tests should pass (the integration test gracefully handles a missing database).

**Checkpoint**: You have a working geo-IP utility with proper error handling.

---

## Milestone 4: Update the Repository Layer

**Goal**: Modify the repository to accept and store `os` and `country` when adding events.

**Verification**: You can manually insert a record with OS and country via a test script or the dev console.

### Step 4.1: Update the `add` Method

Open `data/events.repo.ts` and update the `add` method:

```typescript
import { count, desc, sql } from 'drizzle-orm'
import { getLogger } from 'lib/logger'

import { db } from './db/db'
import { eventsTable } from './db/schema'

export class EventsRepository {
  constructor() {
    throw new Error('Not meant to be instantiated')
  }

  static async add({
    url,
    os,
    country,
  }: {
    url: string
    os?: string | null
    country?: string | null
  }) {
    const name = 'pageview'
    const log = getLogger()

    const event: typeof eventsTable.$inferInsert = {
      name,
      url,
      os: os ?? null,
      country: country ?? null,
    }

    try {
      log.info('Attempting to write to DB')
      await db.insert(eventsTable).values(event)
    } catch (error) {
      console.error('Error writing to DB', error)
    }
  }

  static async totalCount() {
    //@ts-ignore
    const total = await db.select({ value: count() }).from(eventsTable)
    return total[0].value as number
  }

  static async getAll({ limit }: { limit?: number }) {
    if (limit) {
      return await db
        .select()
        .from(eventsTable)
        .orderBy(desc(eventsTable.createdAt))
        .limit(limit)
    }

    return await db
      .select()
      .from(eventsTable)
      .orderBy(desc(eventsTable.createdAt))
  }
}
```

### Step 4.2: Update the DTO Layer

Open `data/events.dto.ts` and update the `addPageView` function to extract headers directly:

```typescript
import { getCountryFromIP } from 'lib/geo'
import { parseOS } from 'lib/user-agent'
import { headers } from 'next/headers'

import { EventsRepository } from './events.repo'

export async function addPageView({ pathname }: { pathname: string }) {
  // Extract headers directly in the DTO - no need to pass them from the action
  const headersList = await headers()

  const ip =
    headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || null
  const userAgent = headersList.get('user-agent')

  // Parse country and OS
  const country = ip ? await getCountryFromIP(ip) : null
  const os = parseOS(userAgent)

  await EventsRepository.add({ url: pathname, os, country })
}

export async function getAnalyticsOverview() {
  const totalEventsCount = await EventsRepository.totalCount()
  const recentPageViews = await EventsRepository.getAll({ limit: 20 })

  return {
    totalCount: totalEventsCount,
    pageViews: recentPageViews,
  }
}
```

**Why access headers in the DTO?**
- ✅ Server actions are ultra-thin (just call DTO directly)
- ✅ No unnecessary parameter passing
- ✅ Business logic and data extraction centralized in one place
- ✅ DTO has all the context it needs to do its job

### Step 4.3: Verify with TypeScript

Run the type checker to make sure everything is wired up correctly:

```bash
pnpm typecheck
```

There should be no errors.

**Checkpoint**: Your data layer can now store OS and country information.

---

## Milestone 5: Wire Up the Server Action

**Goal**: Simplify the `trackPageView` action to just call the DTO - no header extraction needed.

**Verification**: Visit a page on the dev site, then check the database to see OS populated (country will be null for localhost).

### Step 5.1: Update the Server Action

Open `app/actions.ts` and simplify it to just delegate to the DTO:

```typescript
'use server'

import { addPageView } from 'data/events.dto'
import { actionClient } from 'lib/action-client'
import { z } from 'zod'

const trackPageViewInputSchema = z.object({
  pathname: z.string(),
})

export const trackPageView = actionClient
  .inputSchema(trackPageViewInputSchema)
  .action(async ({ parsedInput }) => {
    // DTO handles all header extraction and parsing
    await addPageView({
      pathname: parsedInput.pathname,
    })
  })
```

**Why is the server action so simple?**
- ✅ Server action is just a thin wrapper around the DTO
- ✅ DTO can access `headers()` directly - no need to pass them
- ✅ All business logic lives in one place (the DTO)
- ✅ Easier to test and maintain

### Step 5.2: Verify Locally

1. Start the dev server:
   ```bash
   pnpm dev
   ```

2. Visit any page on your site (e.g., http://localhost:3000)

3. Check the database for the new event:
   ```bash
   psql $DATABASE_URL -c "SELECT id, url, os, country, \"createdAt\" FROM events ORDER BY id DESC LIMIT 5"
   ```

   You should see your OS detected (e.g., "macOS") and country as NULL (because localhost can't be geolocated).

**Checkpoint**: Page views now capture OS information. Country will work once deployed behind a proxy that sets IP headers.

---

## Milestone 6: Update the Analytics Page

**Goal**: Display OS and country on individual page views when present.

**Verification**: Visit `/analytics` and see OS/country displayed on recent page views.

### Step 6.1: Update the Analytics Page

Replace `app/analytics/page.tsx`:

```typescript
import { getAnalyticsOverview } from 'data/events.dto'
import { formatDistanceToNow } from 'date-fns'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const { pageViews, totalCount } = await getAnalyticsOverview()

  return (
    <div className="prose prose-invert">
      <h1>Analytics</h1>
      <p>Total Page Views: {totalCount}</p>

      <h2>Recent Page Views</h2>
      <ul>
        {pageViews.map((view) => (
          <li key={view.id}>
            <span className="font-mono">{view.url}</span>
            {view.os && (
              <span className="ml-2 text-base-400">[{view.os}]</span>
            )}
            {view.country && (
              <span className="ml-2 text-base-400">({view.country})</span>
            )}
            <span className="ml-2 text-base-500">
              {formatDistanceToNow(view.createdAt, { addSuffix: true })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### Step 6.2: Verify Locally

1. Start the dev server if not running:
   ```bash
   pnpm dev
   ```

2. Visit a few pages to generate some events

3. Go to http://localhost:3000/analytics

You should see:
- A total page view count
- Recent page views with OS and country displayed (OS should show, country will be null for localhost)

**Checkpoint**: Your analytics page now shows OS and country information on each page view.

---

## Milestone 7: Production Configuration

**Goal**: Configure the MaxMind database for Railway deployment using a volume.

**Verification**: Analytics works correctly on your deployed site with real country data.

### Step 7.1: Create a Railway Volume

**Why use a volume?**
- ✅ Separates database from Docker image
- ✅ Easy to update database without rebuilding
- ✅ Doesn't override your existing `/app/data` code directory
- ✅ No need to modify Dockerfile or CI pipeline

**Steps:**

1. In Railway project dashboard, go to your service
2. Click on "Volumes" tab
3. Click "New Volume"
4. Set mount path: `/app/maxmind-data`
5. Create the volume

### Step 7.2: Upload the MaxMind Database

**Option A: Using Railway CLI (Recommended)**

```bash
# Install Railway CLI if you haven't
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Upload the database file
railway volume upload /app/maxmind-data data/GeoLite2-Country.mmdb
```

**Option B: Manual upload via Railway dashboard**
1. Go to the volume in Railway dashboard
2. Use the file upload interface to upload `GeoLite2-Country.mmdb`

### Step 7.3: Set Environment Variable

In Railway project settings, add:

```
MAXMIND_DB_PATH=/app/maxmind-data/GeoLite2-Country.mmdb
```

This tells your app where to find the database in production.

### Step 7.4: Verify Database Is Loaded

Check your Railway logs after deployment:

```
MaxMind database loaded from: /app/maxmind-data/GeoLite2-Country.mmdb
```

If you see this warning instead, the database wasn't found:
```
MaxMind database not found. Country detection will be disabled.
```

**Graceful Degradation:**
- ✅ If database is missing, app continues to work
- ✅ Country will be `null` for all visitors
- ✅ OS detection still works (doesn't need a database)
- ✅ No crashes or errors

### Step 7.5: Test Country Detection

1. Visit your deployed site (not localhost)
2. Navigate to a few pages to generate events
3. Go to `/analytics` page
4. You should see country codes like `US`, `GB`, `DE` next to recent page views

**Note:** The first request after deployment will load the database into memory, so there may be a slight delay.

**Checkpoint**: Production analytics is working with real geo data on Railway.

### Step 7.6: Updating the Database (Optional)

MaxMind updates their database periodically. To update:

```bash
# Download latest database locally first
# Then upload to Railway volume
railway volume upload /app/maxmind-data data/GeoLite2-Country.mmdb

# Restart your service to reload the database
railway service restart
```

---

## Milestone 8: Run All Quality Checks

**Goal**: Ensure all code passes linting, formatting, type checking, and tests.

**Verification**: All CI checks pass.

### Step 8.1: Run All Checks

```bash
# Format code
pnpm format

# Run linter
pnpm lint

# Check types
pnpm typecheck

# Run tests
pnpm test
```

### Step 8.2: Fix Any Issues

If there are lint or formatting issues, fix them:

```bash
pnpm lint:fix
pnpm format
```

### Step 8.3: Commit Your Changes

```bash
git add .
git commit -m "Add OS and country detection to analytics"
```

**Checkpoint**: Your feature is complete and ready for review.

---

## Summary

You've successfully implemented OS and country detection for your analytics system:

| Milestone | What You Built | How You Verified |
|-----------|----------------|------------------|
| 1 | Database schema changes | Migration ran, columns visible in DB |
| 2 | User-Agent parser | Unit tests pass |
| 3 | Geo-IP lookup | Unit tests pass, handles edge cases |
| 4 | Repository updates | TypeScript compiles |
| 5 | Server action wiring | DB shows OS for local visits |
| 6 | Analytics page UI | Visual verification in browser |
| 7 | Production config | Live site shows country data |
| 8 | Quality checks | All CI checks pass |

## Further Enhancements

Ideas for extending this feature:

1. **OS and Country breakdown tables**: Add aggregated statistics showing views grouped by OS and country
2. **Country flag display**: Show emoji flags next to country codes for better readability
3. **Time-based filtering**: Add date range filters to the analytics page
4. **Page-specific breakdowns**: Show OS/country stats per URL
5. **Device type detection**: Distinguish mobile vs. desktop vs. tablet
6. **Browser detection**: Extract browser name from User-Agent
7. **Charts/visualization**: Add pie charts or bar graphs using a library like recharts
8. **Real-time updates**: Use server-sent events or websockets for live analytics
9. **Export functionality**: Add CSV/JSON export for the data

---

## Troubleshooting

### "Cannot find module 'maxmind'"
Run `pnpm add maxmind @types/maxmind` to install the dependency.

### Country is always null
- In development: This is expected for localhost IPs
- In production: Ensure your reverse proxy passes `x-forwarded-for` or use Vercel's `x-vercel-ip-country`

### MaxMind database not found
- Check that `data/GeoLite2-Country.mmdb` exists
- Or set `MAXMIND_DB_PATH` environment variable

### TypeScript errors after schema change
- Run `pnpm db:generate` to regenerate types
- Restart your TypeScript server in your editor

### Tests fail with "Cannot connect to database"
- Unit tests should mock database calls
- Use Vitest's `vi.mock()` for integration tests that don't need a real DB
