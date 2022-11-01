import { EnvelopeOpenIcon, EnvelopeIcon } from "@heroicons/react/24/outline"
import { useState } from 'react'

export default function MailButton() {
  const [isHovering, setIsHovering] = useState(false)


  return (
    <div className="inline-flex flex-col">
      <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="drop-shadow-xl bg-gradient-to-r from-orange-400 to-fuchsia-500 mt-4 py-3 px-6 text-slate-100 rounded-md inline-flex items-center font-headline cursor-pointer">
        <EnvelopeIcon className="h-4 w-4 mr-2" />
        <span>
          hi@chrisjarling.com
        </span>
      </div>
      <small className={`mt-2 text-slate-500 dark:text-slate-400 ${!isHovering && 'invisible'}`}>👋 Say hi</small>
    </div>
  )
}
