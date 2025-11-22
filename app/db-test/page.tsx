import { db } from 'data/db/db'
import { testTable } from 'data/db/schema'

import { NewRecordButton } from './NewRecordButton'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const testRecords = await db.select().from(testTable)

  return (
    <div>
      <h1>DB Test Page</h1>
      <p>This is a placeholder page for database testing.</p>

      <NewRecordButton />

      {testRecords.length === 0 ? (
        <p>No test records found.</p>
      ) : (
        <ul>
          {testRecords.map((record) => (
            <li key={record.id}>
              {record.id}: {record.title} (Created at:{' '}
              {record.createdAt.toISOString()})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
