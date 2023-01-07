import { ReactNode } from 'react'

export const PostMetadata = ({ children }: props) => {
  return <small className="text-slate-400 text-sm">{children}</small>
}

type props = {
  children: ReactNode | ReactNode[]
}
