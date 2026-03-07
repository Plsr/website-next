import Link from 'next/link'

type TagProps = {
  name: string
  timesUsed?: number
}

export const Tag = ({ name, timesUsed }: TagProps) => {
  return (
    <Link
      href={`/tags/${name}`}
      className="text-base-200 hover:text-accent-500"
    >
      #{name} {timesUsed && <>({timesUsed}) </>}
    </Link>
  )
}
