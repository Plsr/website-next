'use client'

import { createNewRecord } from './actions'

export const NewRecordButton = () => {
  const handleClick = async () => {
    await createNewRecord()
  }

  return <button onClick={handleClick}>Create new record</button>
}
