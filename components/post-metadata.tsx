import { ReactNode } from 'react'

export const PostMetadata = ({ children }: props) => {
  return <small className="text-neutral-600 text-sm">{children}</small>
}

type props = {
  children: ReactNode | ReactNode[]
}
