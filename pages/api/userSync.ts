import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

const handler = (req: NextRequest) => {
  return NextResponse.json({
    name: `Hello from ${req.url} I'm now an edge function`,
  })
}

export default handler
