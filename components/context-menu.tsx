'use client'

import { useState, useEffect } from 'react'

export const ContextMenu = () => {
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const contextMenuHotkeyHandler = (event: KeyboardEvent) => {
      if (event.key === 'k' && event.metaKey && !showMenu) {
        event.preventDefault()
        setShowMenu(true)
      }

      if (event.key === 'Escape' && showMenu) {
        event.preventDefault()
        setShowMenu(false)
      }
    }

    window.addEventListener('keydown', contextMenuHotkeyHandler)

    return () => {
      window.removeEventListener('keydown', contextMenuHotkeyHandler)
    }
  }, [showMenu])

  if (!showMenu) return null

  return <div>Context Menu</div>
}
