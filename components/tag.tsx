import Link from 'next/link'

type TagProps = {
  name: string
  timesUsed?: number
}

export const Tag = ({ name, timesUsed }: TagProps) => {
  return (
    <Link
      href={`/tags/${name}`}
      className="dark:text-base-200 text-base-700 hover:text-accent-500"
    >
      #{name} {timesUsed && <>({timesUsed}) </>}
    </Link>
  )
}
