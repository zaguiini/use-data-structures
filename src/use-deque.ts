import { useState, useMemo } from 'react'
import produce from 'immer'

export const useDeque = (initialState: number[] = []) => {
  const [value, setValue] = useState(initialState)

  const handlers = useMemo(
    () => ({
      deleteFront: () => {
        setValue((oldDeque) =>
          produce(oldDeque, (draft: number[]) => {
            draft.pop()
          })
        )
      },

      deleteRear: () => {
        setValue((oldDeque) =>
          produce(oldDeque, (draft: number[]) => {
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

      insertFront: (item: number) => {
        setValue((oldDeque) =>
          produce(oldDeque, (draft: number[]) => {
            draft.push(item)
          })
        )
      },

      insertRear: (item: number) => {
        setValue((oldDeque) =>
          produce(oldDeque, (draft: number[]) => {
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
