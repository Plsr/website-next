import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

const classNames = 'h-4 w-4'

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>()

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'))
  }, [])

  const handleDarkModeToggleClick = () => {
    document.documentElement.classList.toggle('dark')
    localStorage.theme = isDarkMode ? 'light' : 'dark'
    setIsDarkMode(!isDarkMode)
  }

  return (
    <button
      onClick={handleDarkModeToggleClick}
      className="p-3 rounded-xs dark:hover:text-teal-400 hover:bg-rose-100 hover:text-teal-500 dark:hover:bg-slate-700"
    >
      {isDarkMode ? (
        <SunIcon className={classNames} />
      ) : (
        <MoonIcon className={classNames} />
      )}
    </button>
  )
}
