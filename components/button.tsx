import { ReactNode } from 'react'

type ButtonProps = {
  variant?: 'outline'
  children: ReactNode | ReactNode[]
}

export const Button = ({ children }: ButtonProps) => {
  return (
    <button className="px-4 py-3 border rounded border-slate-400 hover:border-fuchsia-300 transition hover:text-fuchsia-300 hover:scale-105">
      {children}
    </button>
  )
}
