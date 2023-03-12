import { collection } from '@prisma/client'
import { useState } from 'react'
import { prisma } from '../../lib/utill/db'

export async function getServerSideProps() {
  const collections = await prisma.collection.findMany()

  return {
    props: {
      collections: JSON.parse(JSON.stringify(collections)),
    },
  }
}

const Backoffice = ({ collections }: { collections: collection[] }) => {
  const [collectionName, setCollectionName] = useState('')

  const handleClick = async () => {
    if (!collectionName) {
      return
    }

    try {
      const body = { name: collectionName }
      await fetch('/api/collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Here be backoffice</h1>
      <div>
        <h2>Create new collection</h2>
        <input
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
        />
        <button onClick={handleClick}>Create new collection</button>
      </div>
      {collections.map((collection) => (
        <div key={collection.id}>{collection.name}</div>
      ))}
    </div>
  )
}

export default Backoffice
