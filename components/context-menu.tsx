'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import {
  House,
  PenLine,
  FileUser,
  Sparkle,
  User,
  Tag,
  BookOpenCheck,
} from 'lucide-react'

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
  const [filter, setFilter] = useState('')
  const filteredMenuItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(filter.toLowerCase()),
  )

  const [showMenu, setShowMenu] = useState(false)
  const [activeItem, setActiveItem] = useState<number>(0)
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

        const nextIndex = activeItem + 1

        if (nextIndex >= filteredMenuItems.length) {
          return
        }

        setActiveItem(nextIndex)
      }

      if (showMenu && event.key === 'ArrowUp') {
        event.preventDefault()

        const nextIndex = activeItem - 1

        if (nextIndex < 0) {
          return
        }

        setActiveItem(nextIndex)
      }

      if (showMenu && event.key === 'Enter') {
        event.preventDefault()
        const activeMenuItem = filteredMenuItems[activeItem]

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
  }, [showMenu, activeItem, filteredMenuItems, router])

  const debouncedSetShowMenu = (visible: boolean) => {
    setTimeout(() => {
      setShowMenu(visible)
      setFilter('')
    }, 200)
  }

  const handleMouseOver = (id: string) => {
    const itemIndex = filteredMenuItems.findIndex((item) => item.id === id)
    setActiveItem(itemIndex)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveItem(0)
    setFilter(e.target.value)
  }

  if (!showMenu) return null

  return (
    <RemoveScroll>
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-around backdrop-blur-lg z-40">
        <div className="p-4 bg-base-900 border border-base-700 rounded-lg">
          <input autoFocus value={filter} onChange={handleFilterChange} />
          {filteredMenuItems.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className={clsx(
                'block px-4 py-2 text-sm text-gray-200 rounded flex items-center gap-4',
                activeItem === index && 'bg-base-800',
              )}
              onClick={() => debouncedSetShowMenu(false)}
              onMouseOver={() => handleMouseOver(item.id)}
            >
              <RenderIcon icon={item.id} />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </RemoveScroll>
  )
}

const RenderIcon = ({ icon }: { icon: string }) => {
  const className = 'w-4 h-4'
  switch (icon) {
    case 'home':
      return <House className={className} />
    case 'writing':
      return <PenLine className={className} />
    case 'now':
      return <Sparkle className={className} />
    case 'about':
      return <User className={className} />
    case 'cv':
      return <FileUser className={className} />
    case 'tags':
      return <Tag className={className} />
    case 'reading-notes':
      return <BookOpenCheck className={className} />
    default:
      return null
  }
}
