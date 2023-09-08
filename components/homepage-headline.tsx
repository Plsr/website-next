import { ReactNode } from 'react'

export default function HomepageHeadline({ children }: props) {
  return (
    <div className="flex flex-row items-center mb-6">
      <h2 className="font-title text-storm-gray-300 mr-4 flex-shrink-0">
        {children}
      </h2>
      <div className="h-1 w-full border-b border-b-storm-gray-600" />
    </div>
  )
}

type props = {
  children: ReactNode | ReactNode[]
}
