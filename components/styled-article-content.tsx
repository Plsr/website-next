import type { JSX } from 'react'

type StyledArticleContentProps = {
  contentHtml: string
} & JSX.IntrinsicElements['div']

export const StyledArticleContent = ({
  contentHtml,
  ...rest
}: StyledArticleContentProps) => {
  return (
    <div
      className="prose-invert prose prose-img:rounded-lg"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
      {...rest}
    />
  )
}
