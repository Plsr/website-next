import clsx from 'clsx'

export const FormInput = ({
  className,
  ...props
}: JSX.IntrinsicElements['input']) => {
  return (
    <input
      {...props}
      className={clsx(
        'rounded bg-neutral-800 border border-neutral-400 p-2',
        className
      )}
    />
  )
}
