import Link from 'next/link'
import { cloneElement, JSX } from 'react'

type FooterRowProps = {
  title: string
  listItems: JSX.Element[]
}

export function FooterRow({ listItems, title }: FooterRowProps) {
  return (
    <div className="mb-8 md:mb-0">
      <h4 className="font-bold mb-2 text-base-100">{title}</h4>
      <div>
        {listItems.map((item, index) =>
          cloneElement(item, {
            className: `${index === listItems.length - 1 ? 'mb-0' : 'mb-1'}`,
          }),
        )}
      </div>
    </div>
  )
}

type FooterRowItemProps = {
  href: string
  text: string
}

function FooterRowItem({ href, text, ...rest }: FooterRowItemProps) {
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
