'use server'

import { db } from 'data/db/db'
import { testTable } from 'data/db/schema'
import { getLogger } from 'lib/logger'

export async function createNewRecord() {
  // Placeholder function to create a new record in the database
  // Implement database insertion logic here
  const log = getLogger()
  log.info('Creating a new record in the database...')

  const newRecord = await db
    .insert(testTable)
    .values({
      title: 'New Test Record',
    })
    .returning()

  log.info('New record created successfully.')
  log.debug('New Record:', newRecord[0].title)
}
