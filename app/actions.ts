'use server'

import { addPageView } from 'data/events.dto'
import { actionClient } from 'lib/action-client'
import { z } from 'zod'

const trackPageViewInputSchema = z.object({
  pathname: z.string(),
})

export const trackPageView = actionClient
  .inputSchema(trackPageViewInputSchema)
  .action(async ({ parsedInput }) => {
    const pathname = parsedInput.pathname
    await addPageView({ pathname })
  })
