import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const eventsTable = pgTable('events', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 255 }).notNull(),
  os: varchar({ length: 50 }),
  country: varchar({ length: 2 }),
  createdAt: timestamp({ precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const testTable = pgTable('test', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  createdAt: timestamp({ precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
})
