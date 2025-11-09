// logger.ts
import { PinoTransport } from '@loglayer/transport-pino'
import { getSimplePrettyTerminal } from '@loglayer/transport-simple-pretty-terminal'
import { LogLayer, PluginBeforeMessageOutParams } from 'loglayer'
import { pino } from 'pino'
import { serializeError } from 'serialize-error'

// Detect if we're on the server or client
const isServer = typeof window === 'undefined'

// Create a Pino instance (only needs to be done once)
const pinoLogger = pino({
  level: 'trace', // Set to desired log level
})

const log = new LogLayer({
  errorSerializer: serializeError,
  transport: [
    // Simple Pretty Terminal for development
    getSimplePrettyTerminal({
      enabled: process.env.NODE_ENV === 'development',
      runtime: isServer ? 'node' : 'browser',
      viewMode: 'inline',
    }),
    // Pino for production (both server and client)
    new PinoTransport({
      enabled: process.env.NODE_ENV === 'production',
      logger: pinoLogger,
    }),
  ],
  plugins: [
    {
      // Add a plugin to label the log entry as coming from the server or client
      onBeforeMessageOut(params: PluginBeforeMessageOutParams) {
        const tag = isServer ? 'Server' : 'Client'

        if (params.messages && params.messages.length > 0) {
          if (typeof params.messages[0] === 'string') {
            params.messages[0] = `[${tag}] ${params.messages[0]}`
          }
        }

        return params.messages
      },
    },
  ],
})

// Add server/client context to all log entries
log.withContext({
  isServer,
})

export function getLogger() {
  return log
}
