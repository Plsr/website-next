export const WorkExperience = ({
  title,
  company,
  timespan,
}: {
  title: string
  company: string
  timespan: string
}) => {
  return (
    <div className="flex flex-col">
      <h3 className="font-bold text-lg">{title}</h3>
      <span className="underline decoration-dotted">{company}</span>
      <span className="text-base-400">{timespan}</span>
    </div>
  )
}
