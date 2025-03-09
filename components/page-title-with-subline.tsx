import clsx from 'clsx'
import { JSX, ReactNode } from 'react'

export const PageTitleWithSubline = ({
  title,
  subline,
}: PageTitleWithSublineProps) => {
  return (
    <>
      <h1
        className={clsx(
          'text-2xl font-bold text-base-800 dark:text-base-300',
          subline === undefined ? 'mb-8' : 'mb-2',
        )}
      >
        {title}
      </h1>
      {subline && subline}
    </>
  )
}

type PageTitleWithSublineProps = {
  title: string
  subline?: JSX.Element
}

const Subline = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return <div className="text-base-500 mb-8">{children}</div>
}

PageTitleWithSubline.Subline = Subline
