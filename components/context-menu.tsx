'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { RemoveScroll } from 'react-remove-scroll'

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Writing', href: '/posts' },
  { label: 'Now', href: '/now' },
  { label: 'About', href: '/about' },
  { label: 'CV', href: '/cv' },
  { label: 'Tags', href: '/tags' },
  { label: 'Reading Notes', href: '/reading-notes' },
]

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

  return (
    <RemoveScroll>
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-around backdrop-blur-lg z-40">
        <div className="p-4 bg-base-900 border border-base-700 rounded-lg">
          <input />
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm text-gray-200 hover:bg-base-800 rounded"
              onClick={() => setShowMenu(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </RemoveScroll>
  )
}
