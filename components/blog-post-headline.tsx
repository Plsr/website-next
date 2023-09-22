import clsx from 'clsx'

type Props = {
  title: string
  large?: boolean
  draft?: boolean
  className?: string
}

export const BlogPostHeadline = ({
  title,
  large = true,
  draft = false,
  className,
}: Props) => {
  return (
    <h2
      className={clsx(
        'text-neutral-100 font-bold font-headline',
        large && 'text-2xl',
        !large && 'text-xl',
        className
      )}
    >
      {draft && '📝 '} {title}
    </h2>
  )
}
