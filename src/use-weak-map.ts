import { useState, useMemo } from 'react'
import produce from 'immer'

export const useWeakMap = <TKey extends Object, TValue>(
  initialState: WeakMap<TKey, TValue> = new WeakMap()
) => {
  const [value, setValue] = useState(initialState)

  const handlers = useMemo(
    () => ({
      clear: () => setValue(new WeakMap<TKey, TValue>()),

      delete: (key: TKey) => {
        setValue((oldWeakMap) =>
          produce(oldWeakMap, (draft) => {
            draft.delete(key)
          })
        )
      },

      get: (key: TKey) => value.get(key),

      has: (key: TKey) => value.has(key),

      set: (key: TKey, value: TValue) => {
        setValue((oldWeakMap) =>
          produce(oldWeakMap, (draft) => {
            draft.set(key, value)
          })
        )
      },
    }),
    [value]
  )

  return handlers
}
