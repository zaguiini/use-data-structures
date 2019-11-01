import { useState, useMemo } from 'react'
import produce from 'immer'

export const useQueue = <T>(initialValue: T[] = []) => {
  const [value, setValue] = useState(initialValue)

  const handlers = useMemo(
    () => ({
      dequeue: () => {
        if (value.length === 0) return

        let shifted
        setValue((oldQueue) =>
          produce(oldQueue, (draft: T[]) => {
            shifted = draft.shift()
          })
        )

        return shifted
      },

      enqueue: (item: T) => {
        setValue((oldQueue) =>
          produce(oldQueue, (draft: T[]) => {
            draft.push(item)
          })
        )
      },

      front: () => {
        if (value.length === 0) return

        return value[0]
      },

      isEmpty: () => {
        return value.length === 0
      },

      size: value.length,

      values: () => {
        return value
      },
    }),
    [value]
  )

  return handlers
}
