import { count, desc } from 'drizzle-orm'
import { getLogger } from 'lib/logger'

import { db } from './db/db'
import { eventsTable } from './db/schema'

export class EventsRepository {
  constructor() {
    throw new Error('Not meant to be instantiated')
  }

  static async add({ url }: { url: string }) {
    const name = 'pageview'
    const log = getLogger()

    const event: typeof eventsTable.$inferInsert = {
      name,
      url,
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
