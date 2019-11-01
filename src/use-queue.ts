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
            shifted = draft.pop()
          })
        )

        return shifted
      },

      enqueue: (item: T) => {
        setValue((oldQueue) =>
          produce(oldQueue, (draft: T[]) => {
            draft.unshift(item)
          })
        )
      },


      isEmpty: () => {
        return value.length === 0
      },

      peek: () => {
        let length = value.length
        if (length === 0) return

        return value[length - 1]
      },

      size: value.length,
    }),
    [value]
  )

  return handlers
}
