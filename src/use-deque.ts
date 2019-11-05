import { useState, useMemo } from 'react'
import produce from 'immer'

export const useDeque = <T>(initialState: T[] = []) => {
  const [value, setValue] = useState(initialState)

  const handlers = useMemo(
    () => ({
      deleteFront: () => {
        setValue((oldDeque) =>
          produce(oldDeque, (draft: T[]) => {
            draft.pop()
          })
        )
      },

      deleteRear: () => {
        setValue((oldDeque) =>
          produce(oldDeque, (draft: T[]) => {
            draft.shift()
          })
        )
      },

      getFront: () => {
        return value[value.length - 1]
      },

      getRear: () => {
        return value[0]
      },

      insertFront: (item: T) => {
        setValue((oldDeque) =>
          produce(oldDeque, (draft: T[]) => {
            draft.push(item)
          })
        )
      },

      insertRear: (item: T) => {
        setValue((oldDeque) =>
          produce(oldDeque, (draft: T[]) => {
            draft.unshift(item)
          })
        )
      },

      isEmpty: () => value.length === 0,

      size: value.length,
    }),
    [value]
  )

  return handlers
}
