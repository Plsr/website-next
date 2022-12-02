import { ReactNode } from 'react'

export default function HomepageHeadline({ children }: props) {
  return (
    <h3 className="-mr-2 mb-4 inline-flex items-center font-headline text-xl text-yellow-100">
      {children}
    </h3>
  )
}

type props = {
  children: ReactNode | ReactNode[]
}
