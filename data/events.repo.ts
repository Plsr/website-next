import { count, desc, gte, sql } from 'drizzle-orm'
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
      log.withError(error as Error).error('Error writing to DB')
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

  static async getPageViewsByDay(days: number) {
    if (!days || days <= 0) {
      throw new Error('Days parameter must be a positive number')
    }

    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    const results = await db
      .select({
        date: sql<string>`DATE(${eventsTable.createdAt})`,
        views: count(),
      })
      .from(eventsTable)
      .where(gte(eventsTable.createdAt, cutoffDate))
      .groupBy(sql`DATE(${eventsTable.createdAt})`)
      .orderBy(sql`DATE(${eventsTable.createdAt}) ASC`)

    return results.map((row) => ({
      date: row.date,
      views: Number(row.views),
    }))
  }
}
