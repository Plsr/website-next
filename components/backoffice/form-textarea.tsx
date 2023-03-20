import clsx from 'clsx'

export const FormTextArea = ({
  className,
  ...props
}: JSX.IntrinsicElements['textarea']) => {
  return (
    <textarea
      {...props}
      className={clsx(
        'rounded bg-neutral-800 border border-neutral-400 p-2',
        className
      )}
    />
  )
}
