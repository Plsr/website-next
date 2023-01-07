import clsx from 'clsx'

export const BlogPostHeadline = ({ title, large = true }: props) => {
  return (
    <h2
      className={clsx(
        'text-slate-800 font-bold font-headline',
        large && 'text-3xl',
        !large && 'text-xl'
      )}
    >
      {title}
    </h2>
  )
}

type props = {
  title: string
  large?: boolean
}
