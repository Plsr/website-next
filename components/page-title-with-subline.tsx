import clsx from 'clsx'
import { ReactElement, ReactNode } from 'react'

export const PageTitleWithSubline = ({
  title,
  subline,
}: PageTitleWithSublineProps) => {
  return (
    <>
      <h1
        className={clsx(
          'font-headline text-3xl font-bold',
          subline === undefined ? 'mb-8' : 'mb-2'
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
  subline?: ReactElement
}

const Subline = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return <div className="text-slate-400 text-xl mb-8">{children}</div>
}

PageTitleWithSubline.Subline = Subline
