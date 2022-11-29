import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function ReadMoreLink({
  isHovered,
  text,
  withArrow = false,
}: props) {
  return (
    <div className="mt-3 inline-block text-slate-700 dark:text-slate-300">
      <div className="flex items-center">
        <span>{text}</span>
        {withArrow && (
          <ArrowRightIcon
            className={`transition duration-300 w-4 h-4 ml-2 ${
              isHovered ? 'opacity-1' : 'opacity-0'
            }`}
          />
        )}
      </div>
      <div
        className={`transition duration-300 w-full h-0.5 rounded ${
          isHovered ? 'opacity-1' : 'opacity-0'
        } bg-gradient-to-r from-orange-300 to-fuchsia-400`}
      />
    </div>
  )
}

type props = {
  isHovered: boolean
  withArrow?: boolean
  text: string
}
