import { ReactNode } from 'react'

export default function HomepageHeadline({ children }: props) {
  return (
    <h3 className="-mr-2 mb-6 inline-flex items-center text-xl text-slate-800 font-semibold">
      {children}
    </h3>
  )
}

type props = {
  children: ReactNode | ReactNode[]
}
