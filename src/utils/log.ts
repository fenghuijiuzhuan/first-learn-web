export function error(message: string): void {
  throw new Error(`[error]:${message}`)
}

export function warn(message: string): void {
  console.warn(`[warn]:${message}`)
}
