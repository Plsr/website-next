export function StarRating({ rating }: { rating: number | null }) {
  if (!rating) return null
  const filled = '★'.repeat(rating)
  const empty = '☆'.repeat(5 - rating)
  return (
    <span className="text-accent-500">
      {filled}
      {empty}
    </span>
  )
}
