import { customType } from 'drizzle-orm/pg-core'
import {
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core'

const bytea = customType<{ data: Buffer }>({
  dataType() {
    return 'bytea'
  },
})

export const eventsTable = pgTable(
  'events',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    url: varchar({ length: 255 }).notNull(),
    os: varchar({ length: 50 }),
    country: varchar({ length: 2 }),
    createdAt: timestamp({ precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    createdAtIdx: index('events_created_at_idx').on(table.createdAt),
  }),
)

export const testTable = pgTable('test', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  createdAt: timestamp({ precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const websiteImagesTable = pgTable(
  'website_images',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    slug: varchar({ length: 255 }).notNull(),
    imageType: varchar('image_type', { length: 10 }).notNull(),
    mimeType: varchar('mime_type', { length: 50 }).notNull(),
    imageData: bytea('image_data').notNull(),
    originalUrl: varchar('original_url', { length: 2048 }),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    slugImageTypeIdx: uniqueIndex('website_images_slug_image_type_idx').on(
      table.slug,
      table.imageType,
    ),
  }),
)
