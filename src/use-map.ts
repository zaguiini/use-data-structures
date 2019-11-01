import { useState, useMemo } from 'react'

export const useMap = <TKey, TValue>(
  initialState = new Map<TKey, TValue>()
) => {
  const [value, setValue] = useState(initialState)

  const handlers = useMemo(
    () =>
      Object.assign(value, {
        set: (key: TKey, value: TValue) => {
          setValue((oldMap) => {
            const newMap = new Map(oldMap)
            newMap.set(key, value)

            return newMap
          })
        },

        clear: () => setValue(new Map()),

        delete: (key: TKey) => {
          setValue((oldMap) => {
            const newMap = new Map(oldMap)
            newMap.delete(key)

            return newMap
          })
        },
      }),
    [value]
  )

  return handlers
}
