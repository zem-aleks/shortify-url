import { useCallback, useEffect, useState } from 'react'

import { notReachable } from '../../utility/notReachable'

export type LoadableData<Data, Params> =
  | {
      type: 'error'
      error: string
    }
  | {
      type: 'loading'
      params?: Params
    }
  | {
      type: 'loaded'
      data: Data
    }

type LoadableDataHook<Data, Params> = {
  reload: (params?: Params) => void
  state: LoadableData<Data, Params>
}

export const useLoadableData = <Data, Params>(
  fetchData: (params?: Params) => Promise<Data>,
  params?: Params
): LoadableDataHook<Data, Params> => {
  const [state, setState] = useState<LoadableData<Data, Params>>({
    type: 'loading',
    params,
  })

  const reload = useCallback((params?: Params) => {
    setState({ type: 'loading', params })
  }, [])

  useEffect(() => {
    switch (state.type) {
      case 'error':
      case 'loaded':
        break

      case 'loading':
        fetchData(state.params)
          .then((data) => {
            setState({ type: 'loaded', data })
          })
          .catch((error: Error) => {
            setState({ type: 'error', error: error.message })
          })
        break

      default:
        return notReachable(state)
    }
  }, [fetchData, state])

  return {
    state,
    reload,
  }
}
