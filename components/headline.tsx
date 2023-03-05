import { ReactNode } from 'react'

export const Headline = ({ level, children, id }: props) => {
  if (level === 2)
    return (
      <h2 id={id} className="text-xl font-bold mb-4 mt-8">
        {children}
      </h2>
    )
  if (level === 3)
    return (
      <h3 id={id} className="text-lg font-bold mb-4 mt-8">
        {children}
      </h3>
    )
  if (level === 4)
    return (
      <h3 id={id} className="font-bold mb-4 mt-8">
        {children}
      </h3>
    )
  return null
}

type props = {
  level: 2 | 3 | 4
  children: ReactNode | ReactNode[]
  id?: string
}
