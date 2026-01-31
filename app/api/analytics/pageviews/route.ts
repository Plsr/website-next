import { getPageViewsOverTime } from 'data/events.dto'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const daysParam = searchParams.get('days')

  const days = daysParam ? parseInt(daysParam, 10) : 30

  // Validate days parameter
  if (isNaN(days) || days <= 0 || days > 365) {
    return NextResponse.json(
      { error: 'Invalid days parameter' },
      { status: 400 },
    )
  }

  const data = await getPageViewsOverTime(days)

  return NextResponse.json(data)
}
