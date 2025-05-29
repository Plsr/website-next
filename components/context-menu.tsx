'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { RemoveScroll } from 'react-remove-scroll'

const menuItems = [
  { label: 'Home', href: '/', id: 'home' },
  { label: 'Writing', href: '/posts', id: 'writing' },
  { label: 'Now', href: '/now', id: 'now' },
  { label: 'About', href: '/about', id: 'about' },
  { label: 'CV', href: '/cv', id: 'cv' },
  { label: 'Tags', href: '/tags', id: 'tags' },
  { label: 'Reading Notes', href: '/reading-notes', id: 'reading-notes' },
]

export const ContextMenu = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(menuItems[0].id)
  const router = useRouter()

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

      if (showMenu && event.key === 'ArrowDown') {
        event.preventDefault()
        const currentIndex = menuItems.findIndex(
          (item) => item.id === activeItem,
        )

        const nextIndex = currentIndex + 1

        if (nextIndex >= menuItems.length) {
          return
        }

        setActiveItem(menuItems[nextIndex].id)
      }

      if (showMenu && event.key === 'ArrowUp') {
        event.preventDefault()
        const currentIndex = menuItems.findIndex(
          (item) => item.id === activeItem,
        )

        const nextIndex = currentIndex - 1

        if (nextIndex < 0) {
          return
        }

        setActiveItem(menuItems[nextIndex].id)
      }

      if (showMenu && event.key === 'Enter') {
        event.preventDefault()
        const activeMenuItem = menuItems.find((item) => item.id === activeItem)
        if (activeMenuItem) {
          router.push(activeMenuItem.href)
          debouncedSetShowMenu(false)
        }
      }
    }

    window.addEventListener('keydown', contextMenuHotkeyHandler)

    return () => {
      window.removeEventListener('keydown', contextMenuHotkeyHandler)
    }
  }, [showMenu, activeItem])

  const debouncedSetShowMenu = (visible: boolean) => {
    setTimeout(() => {
      setShowMenu(visible)
    }, 200)
  }

  const handleMouseOver = (id: string) => {
    setActiveItem(id)
  }

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
              className={clsx(
                'block px-4 py-2 text-sm text-gray-200 rounded',
                activeItem === item.id && 'bg-base-800',
              )}
              onClick={() => debouncedSetShowMenu(false)}
              onMouseOver={() => handleMouseOver(item.id)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </RemoveScroll>
  )
}
