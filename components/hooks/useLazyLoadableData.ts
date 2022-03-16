import { useEffect, useState } from 'react'

import { notReachable } from '../../utility/notReachable'

type LazyLoadableData<Data, Params> =
  | {
      type: 'notRequested'
    }
  | {
      type: 'error'
      error: string
    }
  | {
      type: 'loading'
      params: Params
    }
  | {
      type: 'loaded'
      data: Data
    }

type LazyLoadableDataHook<Data, Params> = {
  load: (params: Params) => void
  cancel: () => void
  state: LazyLoadableData<Data, Params>
}

export const useLazyLoadableData = <Data, Params>(
  fetchData: (params: Params) => Promise<Data>
): LazyLoadableDataHook<Data, Params> => {
  const [state, setState] = useState<LazyLoadableData<Data, Params>>({
    type: 'notRequested',
  })

  const load = (params: Params) => {
    setState({ type: 'loading', params })
  }

  const cancel = () =>
    setState({
      type: 'notRequested',
    })

  useEffect(() => {
    switch (state.type) {
      case 'notRequested':
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
    load,
    cancel,
  }
}
