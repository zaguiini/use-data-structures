import { useState, useMemo } from 'react'
import produce from 'immer'

export const useWeakSet = <T extends Object>(
  initialState: WeakSet<T> = new WeakSet<T>()
) => {
  const [value, setValue] = useState(initialState)

  const handlers = useMemo(
    () => ({
      add: (item: T) => {
        setValue((oldWeakSet) =>
          produce(oldWeakSet, (draft) => {
            draft.add(item)
          })
        )
      },

      clear: () => setValue(new WeakSet<T>()),

      delete: (item: T) => {
        setValue((oldWeakSet) =>
          produce(oldWeakSet, (draft) => {
            draft.delete(item)
          })
        )
      },

      has: (item: T) => value.has(item),
    }),
    [value]
  )

  return handlers
}
