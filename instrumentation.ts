import { BetterStackTransport } from '@loglayer/transport-betterstack'
import { PinoTransport } from '@loglayer/transport-pino'
import { getSimplePrettyTerminal } from '@loglayer/transport-simple-pretty-terminal'
import { type ILogLayer, LogLayer } from 'loglayer'
import pino from 'pino'
import { serializeError } from 'serialize-error'

// TODO: Move logging logic out of here and into /lib

/**
 * Strip ANSI codes from a string, which is something Next.js likes to inject.
 */
function stripAnsiCodes(str: string): string {
  return str.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    '',
  )
}

/**
 * Create a console method that logs to LogLayer
 */
function createConsoleMethod(
  log: ILogLayer,
  method: 'error' | 'info' | 'warn' | 'debug' | 'log',
) {
  let mappedMethod: 'error' | 'info' | 'warn' | 'debug'

  if (method === 'log') {
    mappedMethod = 'info'
  } else {
    mappedMethod = method
  }

  return (...args: unknown[]) => {
    const data: Record<string, unknown> = {}
    let hasData = false
    let error: Error | null = null
    const messages: string[] = []

    for (const arg of args) {
      if (arg instanceof Error) {
        error = arg
        continue
      }

      if (typeof arg === 'object' && arg !== null) {
        Object.assign(data, arg)
        hasData = true
        continue
      }

      if (typeof arg === 'string') {
        messages.push(arg)
      }
    }

    let finalMessage = stripAnsiCodes(messages.join(' ')).trim()

    // next.js uses an "x" for the error message when it's an error object
    if (finalMessage === '⨯' && error) {
      finalMessage = error?.message || ''
    }

    if (error && hasData && messages.length > 0) {
      log.withError(error).withMetadata(data)[mappedMethod](finalMessage)
    } else if (error && messages.length > 0) {
      log.withError(error)[mappedMethod](finalMessage)
    } else if (hasData && messages.length > 0) {
      log.withMetadata(data)[mappedMethod](finalMessage)
    } else if (error && hasData && messages.length === 0) {
      log.withError(error).withMetadata(data)[mappedMethod]('')
    } else if (error && messages.length === 0) {
      log.errorOnly(error)
    } else if (hasData && messages.length === 0) {
      log.metadataOnly(data)
    } else {
      log[mappedMethod](finalMessage)
    }
  }
}

export async function register() {
  const logger = new LogLayer({
    errorSerializer: serializeError,
    transport: [
      // Simple Pretty Terminal for development
      getSimplePrettyTerminal({
        enabled: process.env.NODE_ENV === 'development',
        runtime: 'node', // Server-side only in instrumentation
        viewMode: 'inline',
      }),
      // Pino for production
      new PinoTransport({
        enabled: process.env.NODE_ENV === 'production',
        logger: pino(),
      }),
      new BetterStackTransport({
        enabled: process.env.NODE_ENV === 'production',
        sourceToken: process.env.BETTER_STACK_SOURCE_TOKEN!,
        url: `https://${process.env.BETTER_STACK_INGESTING_HOST}`,
        onError: (err) => {
          console.error('Failed to send logs to Better Stack:', err)
        },
      }),
    ],
  })

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.error = createConsoleMethod(logger, 'error')
    console.log = createConsoleMethod(logger, 'log')
    console.info = createConsoleMethod(logger, 'info')
    console.warn = createConsoleMethod(logger, 'warn')
    console.debug = createConsoleMethod(logger, 'debug')

    // Download MaxMind database from Railway Bucket on startup
    // Dynamic import to avoid Edge Runtime bundling issues with Node.js modules
    const { downloadMaxMindDatabase } = await import('./lib/download-maxmind')
    await downloadMaxMindDatabase()
  }
}
