import { ReactElement, cloneElement } from 'react'
import Link from 'next/link'

type FooterRowProps = {
  title: string
  listItems: ReactElement<any>[]
}

export function FooterRow({ listItems, title }: FooterRowProps) {
  return (
    <div className="mb-8 md:mb-0">
      <h4 className="font-title font-bold mb-2 dark:text-base-100 text-base-700">
        {title}
      </h4>
      <div>
        {listItems.map((item, index) =>
          cloneElement(item, {
            className: `${index === listItems.length - 1 ? 'mb-0' : 'mb-1'}`,
          })
        )}
      </div>
    </div>
  )
}

type FooterRowItemProps = {
  href: string
  text: string
  hidden?: boolean
}

function FooterRowItem({
  href,
  text,
  hidden = false,
  ...rest
}: FooterRowItemProps) {
  if (hidden) {
    return null
  }

  return (
    <div {...rest}>
      <Link
        href={href}
        className="underline-offset-4 hover:underline mb-2 block dar:text-base-400 text-base-500"
      >
        <p>{text}</p>
      </Link>
    </div>
  )
}

FooterRow.Item = FooterRowItem
