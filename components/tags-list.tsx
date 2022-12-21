type TagsListProps = {
  tags: string[]
}

export const TagsList = ({ tags }: TagsListProps) => {
  return (
    <>
      {tags.map((tag) => (
        <span className="mr-4 px-4 py-2 bg-slate-800 rounded-xl" key={tag}>
          #{tag}
        </span>
      ))}
    </>
  )
}
