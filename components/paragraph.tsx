import { ReactNode } from 'react'

export const Paragraph = ({ children }: props) => {
  return <p className="text-slate-700 mb-2">{children}</p>
}

type props = {
  children: ReactNode | ReactNode[]
}
