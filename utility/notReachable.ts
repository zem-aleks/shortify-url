export const notReachable = (state: never): never => {
  throw new Error(`Not reachable state appeared: ${state}`)
}
