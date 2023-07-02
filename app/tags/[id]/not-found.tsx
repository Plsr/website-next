import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div>😢</div>
      <p>This tag could not be found.</p>
      <p>
        You can see all available tags{' '}
        <Link className="text-blue-500" href={'/tags'}>
          here
        </Link>
      </p>
    </div>
  )
}
