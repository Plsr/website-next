import Link from 'next/link'

type TagProps = {
  name: string
}

export const Tag = ({ name }: TagProps) => {
  return (
    <Link href={`/tags/${name}`}>
      <span className="mr-4 hover:border-b-2 hover:border-blue-500 hover:text-blue-500">
        #{name}
      </span>
    </Link>
  )
}
