'use client'

import { trackPageView } from 'app/actions'
import { usePathname } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useEffect } from 'react'

export const Analytics = () => {
  const pathname = usePathname()
  const { execute } = useAction(trackPageView)

  useEffect(() => {
    execute({ pathname })
  }, [pathname])

  return <></>
}
