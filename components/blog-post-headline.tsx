import clsx from 'clsx'

export const BlogPostHeadline = ({ title, large = true, className }: props) => {
  return (
    <h2
      className={clsx(
        'text-neutral-100 font-bold font-headline',
        large && 'text-2xl',
        !large && 'text-xl',
        className
      )}
    >
      {title}
    </h2>
  )
}

type props = {
  title: string
  large?: boolean
} & JSX.IntrinsicElements['div']
