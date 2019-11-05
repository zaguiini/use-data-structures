import { useState, useMemo } from 'react'
import produce from 'immer'

export const useDeque = <T>(initialState: T[] = []) => {
  const [value, setValue] = useState(initialState)

  const handlers = useMemo(
    () => ({
      addFront: (item: T) => {
        setValue((oldDeque) =>
          produce(oldDeque, (draft: T[]) => {
            draft.push(item)
          })
        )
      },

      addRear: (item: T) => {
        setValue((oldDeque) =>
          produce(oldDeque, (draft: T[]) => {
            draft.unshift(item)
          })
        )
      },

      clear: () => setValue([] as T[]),

      isEmpty: () => value.length === 0,

      peekFront: () => value[value.length - 1],

      peekRear: () => {
        return value[0]
      },

      removeFront: () => {
        setValue((oldDeque) =>
          produce(oldDeque, (draft: T[]) => {
            draft.pop()
          })
        )
      },

      removeRear: () => {
        setValue((oldDeque) =>
          produce(oldDeque, (draft: T[]) => {
            draft.shift()
          })
        )
      },

      size: value.length,
    }),
    [value]
  )

  return handlers
}
