import styles from './styled-article-content.module.css'

type StyledArticleContentProps = {
  contentHtml: string
} & JSX.IntrinsicElements['div']

export const StyledArticleContent = ({
  contentHtml,
  ...rest
}: StyledArticleContentProps) => {
  return (
    <div
      className="dark:prose-invert prose"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
      {...rest}
    />
  )
}
