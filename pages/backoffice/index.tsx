import Link from 'next/link'

const Backoffice = () => {
  return (
    <div>
      <h1>Welcome to the backoffice</h1>
      <Link href="backoffice/bookmarks">Bookmarks</Link>
    </div>
  )
}

export default Backoffice
