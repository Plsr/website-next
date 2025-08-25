type TimelineItemProps = {
  title: string
  company: string
  startDate: string
  endDate?: string
}

export const TimelineItem = ({
  title,
  company,
  startDate,
  endDate,
}: TimelineItemProps) => {
  const current = endDate === undefined
  return (
    <div className="relative py-4">
      <div className="flex flex-col">
        <div className="flex flex-row gap-2">
          <span>
            {startDate} {current ? null : ` - ${endDate}`}
          </span>
          {current && (
            <div className="inline bg-accent-800/30 px-2 pt-[5px] pb-[0px] border border-accent-800/70 text-accent-400 rounded-full text-xs">
              Current
            </div>
          )}
        </div>
        <span className="text-base-200">{title}</span>
        <span className="text-sm">{company}</span>
      </div>
    </div>
  )
}
