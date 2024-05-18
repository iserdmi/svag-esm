import { createRequire } from 'module'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

// Thanks: https://gist.github.com/khalidx/1c670478427cc0691bda00a80208c8cc

/**
 * This is an ESM replacement for `__filename`.
 *
 * Use it like this: `__filename(import.meta)`.
 */
export const get__filename = (meta: ImportMeta): string => fileURLToPath(meta.url)

/**
 * This is an ESM replacement for `__dirname`.
 *
 * Use it like this: `__dirname(import.meta)`.
 */
export const get__dirname = (meta: ImportMeta): string => dirname(get__filename(meta))

/**
 * Indicates that the script was run directly.
 * This is an ESM replacement for `require.main === module`.
 *
 * Use it like this: `isMain(import.meta)`.
 */
export const isMain = (meta: ImportMeta): boolean => {
  if (!meta || !process.argv[1]) return false
  const require = createRequire(meta.url)
  const scriptPath = require.resolve(process.argv[1])
  const modulePath = get__filename(meta)
  return scriptPath === modulePath
}
